import Footer from '@/app/[lng]/(root)/_components/footer'
import Navbar from '@/app/[lng]/(root)/_components/navbar'
import RefreshModal from '@/components/modals/refresh.modal'
import AiButton from '@/components/shared/ai-button'
import type { ChildProps } from '@/types'

function Layout ({children} : ChildProps) {
		return (
			<div>
				<main>
					<Navbar/>
					{children}
					<Footer/>
				</main>
				<RefreshModal/>
				<AiButton/>
			</div>
		)
}
export default Layout
