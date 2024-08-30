"use client"

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup, DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { lngs } from '@/constants'
import { cn } from '@/lib/utils'
import { Languages } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

function LanguageDropdown () {
	const { lng } = useParams()
	const pathname = usePathname()
	
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={'ghost'} size={'icon'} aria-label={'language-dropdown'}>
					<Languages/>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					{lngs.map((item) => (
						<Link href={`/${item.route}/${pathname.slice(4)}`} key={item.route}>
							<DropdownMenuItem
								key={item.route}
								className={cn('cursor-pointer', lng === item.route && 'bg-secondary')}>
								<Image src={`/assets/locales/${item.route}.png`} alt={item.route} width={30} height={30}/>
								<span className={'ml-2 font-spaceGrotesk font-medium'}>{item.label}</span>
							</DropdownMenuItem>
						</Link>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
export default LanguageDropdown
