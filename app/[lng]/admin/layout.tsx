import { getRole } from '@/actions/user.action'
import Navbar from '@/components/shared/navbar'
import Sidebar from '@/components/shared/sidebar'
import { ChildProps } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

async function Layout({ children }: ChildProps) {
	const {userId} = auth()
	const user = await getRole(userId!)
	
	if (!user.isAdmin) redirect('/')
	
	return (
		<>
			<Navbar />
			<Sidebar page={'admin'} />
			<main className='w-full p-4 md:pl-[320px] pt-[12vh] pl-[80px]'>
				<div className='size-full rounded-md bg-secondary px-4 pb-4'>
					{children}
				</div>
			</main>
		</>
	)
}

export default Layout
