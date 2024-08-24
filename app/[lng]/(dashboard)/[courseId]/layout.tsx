'use client'

import { ChildProps } from '@/types'
import { useParams } from 'next/navigation'
import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'

interface Props extends ChildProps {
	params: { lng: string; lessonId: string; courseId: string }
}
function Layout({ params: { lessonId, lng , courseId}, children }: Props) {
	
	 const lesson = lessonId
	return (
		<div className='relative'>
			<Navbar/>
			<div className='flex'>
				{/* <Sidebar lessonId={lessonId} lng={lng} /> */}
				<section className='flex min-h-screen flex-1 flex-col px-4 pb-6 pt-24 max-md:pb-14 sm:px-14'>
					<div className='mx-auto w-full max-w-5xl'>{children}</div>
				</section>
			</div>
		</div>
	)
}

export default Layout
