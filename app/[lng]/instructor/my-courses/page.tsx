'use client'

import Header from '@/app/[lng]/instructor/_components/header'
import InstructorCourseCard from '@/components/cards/instructor-course.card'
import { courses } from '@/constants'

const Page = () => {
	return (
		<div>
			<Header title='My courses' description='Here are your latest courses' />
			<div className={'grid grid-cols-3 gap-4 mt-4'}>
				{courses.map(course => (
					<InstructorCourseCard key={course.title} {...course}/>
				))}
			</div>
			
		</div>
	)
}
export default Page
