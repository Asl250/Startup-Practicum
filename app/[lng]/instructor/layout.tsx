'use client'

import Navbar from '@/app/[lng]/instructor/_components/navbar'
import Sidebar from '@/app/[lng]/instructor/_components/sidebar'
import type { ChildProps } from '@/types'

const Layout = ({children}: ChildProps) => {
	return (
		<>
			<Navbar/>
			<Sidebar/>
			<main className={'w-full pl-[320px] pt-[11vh]'}>
				<div className={'size-full px-4 pb-4 pt-1 rounded-md bg-secondary'}>
					{children}
				</div>
			</main>
		</>
	)
}
export default Layout
