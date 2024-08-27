import Sidebar from '@/app/[lng]/profile/_components/sidebar'
import { ChildProps } from '@/types'

function Layout({ children }: ChildProps) {
	return (
		<>
			<Sidebar />
			<main className='w-full p-4 pr-[420px] max-md:pr-24'>
				<div className='size-full rounded-md bg-secondary px-4 pb-4'>
					{children}
				</div>
			</main>
		</>
	)
}

export default Layout
