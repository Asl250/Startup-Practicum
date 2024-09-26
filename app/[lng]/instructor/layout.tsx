'use client'

import { getRole } from '@/actions/user.action'
import Navbar from '@/components/shared/navbar'
import Sidebar from '@/components/shared/sidebar'
import type { ChildProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Layout = async ({children}: ChildProps) => {
	const {userId} = auth()
	
	const user = await getRole(userId!)
	
	if (user.role !== 'instructor') return redirect('/')
	
	return (
		<>
			<Navbar/>
			<Sidebar page={'instructor'}/>
			<main className={'w-full md:pl-[320px] pt-[11vh] p-4 pl-[80px]'}>
				<div className={'size-full px-4 pb-4 pt-1 rounded-md bg-secondary'}>
					{children}
				</div>
			</main>
		</>
	)
}
export default Layout
