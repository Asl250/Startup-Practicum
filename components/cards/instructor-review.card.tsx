'use client'

import { setFlag } from '@/actions/review.action'
import type { IReview } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { Flag } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import ReactStars from 'react-stars'

interface Props {
	review: IReview,
	isProfile?: boolean
	isAdmin?: boolean
}


function InstructorReviewCard({review, isProfile, isAdmin}: Props) {
	const [isLoading, setIsLoading] = useState(false)
	const pathname  = usePathname()
	
	const handleFlag = async () => {
		setIsLoading(true)
		
		const promise = setFlag(review._id, !review.isFlag, pathname)
			.finally(() => setIsLoading(false))
		
		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully flagged!',
			error: 'Something went wrong!',
		})
	}
	
	return (
		<>
			<Toaster theme={'dark'} richColors position={'top-center'}/>
			<div className={cn(
				'relative flex gap-4 border-b pb-4',
				isAdmin && 'bg-background p-2 rounded-md'
			)}>
				{isLoading && <FillLoading />}
				<div className='flex-1'>
					<div className='flex gap-3'>
						<Avatar>
							<AvatarImage src={review.user.picture} />
							<AvatarFallback className='uppercase'>
								{review.user.fullName[0]}
							</AvatarFallback>
						</Avatar>
						
						<div className='flex flex-col'>
							<div className='font-spaceGrotesk text-sm'>
								{review.user.fullName}{' '}
								<span className='text-xs text-muted-foreground'>
								{formatDistanceToNow(new Date(review.createdAt))} ago
							</span>
							</div>
							<ReactStars value={4.5} edit={false} color2='#E59819' />
							<div className='font-spaceGrotesk font-bold'>
								{review.course.title}
							</div>
							<p className='text-sm text-muted-foreground'>
								{review.data}
							</p>
						</div>
					</div>
				</div>
				{isProfile ? (
					<Button variant={'ghost'} size={'icon'} className='self-start'>
						{review.isFlag ? (
							<FaTimes className='text-red-500' />
						) : (
							<FaCheck className='text-green-500' />
						)}
					</Button>
				) : (
					<Button
						size={'icon'}
						variant={'ghost'}
						className='self-start'
						onClick={handleFlag}
					>
						<Flag
							className={cn(
								'text-muted-foreground',
								review.isFlag && 'fill-white'
							)}
						/>
					</Button>
				)}
			</div>
		</>
	
	)
}

export default InstructorReviewCard
