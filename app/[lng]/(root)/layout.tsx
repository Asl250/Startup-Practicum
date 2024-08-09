import Navbar from '@/app/[lng]/(root)/_components/Navbar'
import type { ChildProps } from '@/types'

function Layout ({children} : ChildProps) {
		return (
			<div>
				<main>
					<Navbar/>
					{children}
				</main>
			</div>
		)
}
export default Layout
