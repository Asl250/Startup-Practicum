"use client"

import GlobalSearch from '@/app/[lng]/(root)/_components/global-search'
import LanguageDropdown from '@/components/shared/language-dropdown'
import Logo from '@/components/shared/logo'
import ModeToggle from '@/components/shared/mode-toggle'
import { Button } from '@/components/ui/button'
import { navLinks } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { useTranslation } from '@/i18n/client'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const Navbar = () => {
	const t = useTranslate()

	
	return (
		<div className={'fixed inset-0 z-40 h-20 bg-background/70 backdrop-blur-xl'}>
			<div className={'container mx-auto flex h-full items-center max-w-7xl justify-between border-b'}>
				<div className={'flex items-center gap-4'}>
				<Logo/>
					<div className={'flex items-center gap-3 border-l pl-2'}>
						{navLinks.map((nav => {
							return (
								<Link
									href={`${nav.route}`}
									key={nav.name}
									className={'font-medium hover:underline hover:text-blue-500 transition-all duration-200'}>
									{t(nav.name)}
								</Link>
							)
						}))}
					</div>
				</div>
				
				<div className={'flex items-center gap-2'}>
					<div className={'flex items-center gap-2 border-r pr-3'}>
						<GlobalSearch/>
						<LanguageDropdown/>
						<Button size={'icon'} variant={'ghost'}>
							<ShoppingCart/>
						</Button>
						<ModeToggle/>
					</div>
					
					<SignedOut>
						<SignInButton mode={'modal'}>
							<Button variant={'ghost'} size={'lg'} rounded={'full'}>Log in</Button>
						</SignInButton>
						<SignUpButton mode={'modal'}>
							<Button size={'lg'} rounded={'full'}>Sign up</Button>
						</SignUpButton>
					</SignedOut>
				
					<SignedIn>
						<UserButton/>
					</SignedIn>
					
				</div>
			</div>
		</div>
	)
}
export default Navbar
