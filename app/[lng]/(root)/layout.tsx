import Footer from '@/app/[lng]/(root)/_components/footer'
import Navbar from '@/app/[lng]/(root)/_components/navbar'
import type { ChildProps } from '@/types'

function Layout ({children} : ChildProps) {
		return (
			<div>
				<main>
					<Navbar/>
					{children}
					<Footer/>
				</main>
			</div>
		)
}
export default Layout
