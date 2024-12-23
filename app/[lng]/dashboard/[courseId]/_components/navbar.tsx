'use client'

import DropdownContent from '@/app/[lng]/dashboard/[courseId]/_components/dropdown-content'
import Logo from '@/components/shared/logo'
import UserBox from '@/components/shared/user-box'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useTranslate from '@/hooks/use-translate'
import { useMassage } from '@/hooks/useMassage'
import { useReview } from '@/hooks/useReview'
import { MessageCirclePlus, MoreVertical, Star } from 'lucide-react'

function Navbar() {
	const {onOpen} = useReview()
	const {onOpenMassage} = useMassage()
	const t = useTranslate()

	return (
		<div className='fixed inset-x-0 top-0 z-50 flex h-[10vh] w-full items-center justify-between border-b bg-gray-100 px-2 dark:bg-gray-900 lg:pl-80'>
			<div className='ml-2'>
				<Logo />
			</div>
			
			<div className='mr-4 flex items-center space-x-2'>
				<div
					className='hidden cursor-pointer items-center gap-1 opacity-50 transition-all duration-200 hover:opacity-100 md:flex'
					role='button'
					onClick={onOpenMassage}
				>
					<MessageCirclePlus  size={20} />
					<p>massage</p>
				</div>
				
				
				<div
					className='hidden cursor-pointer items-center gap-1 opacity-50 transition-all duration-200 hover:opacity-100 md:flex'
					role='button'
					onClick={onOpen}
				>
					<Star size={20} />
					<p>{t('evaluation')}</p>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size={'icon'} variant={'ghost'}>
							<MoreVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownContent />
				</DropdownMenu>
				<UserBox />
			</div>
		</div>
	)
}

export default Navbar
