'use client'

import AllCourses from '@/app/[lng]/(root)/courses/_components/all-courses'
import TopBar from '@/components/shared/top-bar'

const Page = () => {
	return (
		<>
			<TopBar label={'allCourses'} description={'allCourseDescription'} extra={'ReactJs'} />
			<AllCourses/>
		</>
	)
}
export default Page
