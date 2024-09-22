'use client'

import { deleteMassage } from '@/actions/massage.action'
import { IMassage } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

interface Props {
	massage: IMassage,
	isProfile?: boolean
}


function MassageCard({massage, isProfile}: Props) {
	const [isLoading, setIsLoading] = useState(false)
	const pathname  = usePathname()
	
	const handleFlag = async () => {
		setIsLoading(true)
		
		const upd = deleteMassage(massage._id, pathname).finally(() =>
			setIsLoading(false)
		)
		
		const promise = Promise.all([upd])
		
		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully deleted!',
			error: 'Something went wrong!',
		})
	}
	
	return (
		<>
			<Toaster theme={'dark'} richColors position={'top-center'}/>
			<div className={cn(
				'relative flex gap-4 border-b pb-4')}>
				{isLoading && <FillLoading />}
				<div className='flex-1'>
					<div className='flex gap-3'>
						<Avatar>
							<AvatarImage src={massage.user.picture} />
							<AvatarFallback className='uppercase'>
								{massage.user.fullName[0]}
							</AvatarFallback>
						</Avatar>
						
						<div className='flex flex-col'>
							<div className='font-spaceGrotesk text-sm'>
								{massage.user.fullName}{' '}
								<span className='text-xs text-muted-foreground'>
								{formatDistanceToNow(new Date(massage.createdAt))} ago
							</span>
							</div>
							<div className='font-spaceGrotesk font-bold'>
								{massage.course.title}
							</div>
							<p className='text-sm text-muted-foreground'>
								{massage.data}
							</p>
						</div>
					</div>
				</div>
				{isProfile ? (
					<></>
				) : (
					<Button
						size={'icon'}
						variant={'destructive'}
						className='self-start'
						onClick={handleFlag}
					>
						<X
							className={cn('text-muted-foreground',)}
						/>
					</Button>
				)}
			</div>
		</>
	
	)
}

export default MassageCard
