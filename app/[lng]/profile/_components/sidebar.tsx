'use client'

import LanguageDropdown from '@/components/shared/language-dropdown'
import Logo from '@/components/shared/logo'
import ModeToggle from '@/components/shared/mode-toggle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { profileNavLinks } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Sidebar() {
	const pathname = usePathname()
	const t = useTranslate()
	
	return (
		<div
			className='fixed inset-y-0 right-0 xl:w-[440px] border-l bg-gradient-to-b from-background to-secondary p-4 max-lg:w-20 max-md:px-2'>
			<div className='xl:flex items-center justify-between max-lg:hidden'>
				<Logo />
				
				<div className='flex items-center gap-1'>
					<ModeToggle />
					<LanguageDropdown />
					<UserButton />
				</div>
			</div>
			
			<Separator className='my-3 max-lg:hidden' />
			
			<div className='flex flex-col space-y-3'>
				{profileNavLinks.map(item => (
					<Link href={item.route} key={item.route}>
						<Button
							className='flex w-full justify-start gap-2 max-lg:w-fit max-lg:justify-center'
							variant={pathname.slice(3) === item.route ? 'secondary' : 'ghost'}
						>
							<item.icon className='size-5 text-muted-foreground' />
							<span className='max-lg:hidden'>{t(item.label)}</span>
						</Button>
					</Link>
				))}
				<div className={'lg:hidden flex ml-[15px]'}>
					<UserButton/>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
