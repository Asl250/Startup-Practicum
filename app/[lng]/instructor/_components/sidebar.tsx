'use client'

import { Button } from '@/components/ui/button'
import { instructorNavLinks } from '@/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
	const pathname = usePathname()
	
	return (
		<div className={'fixed mt-[10vh] h-[90vh] w-[300px] inset-0 border-r'}>
			<div className={'container mt-6'}>
				<div className={'flex flex-col space-y-3'}>
					{instructorNavLinks.map(item => (
						<Link
							key={item.route}
							href={`/instructor${item.route}`}
						>
							<Button
								className={'flex w-full justify-start gap-2'}
								variant={pathname.slice(3) === item.route ? 'secondary' : 'ghost'}>
								<item.icon className={'size-5 text-muted-foreground'}/>
								<span>{item.label}</span>
							</Button>
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}
export default Sidebar
