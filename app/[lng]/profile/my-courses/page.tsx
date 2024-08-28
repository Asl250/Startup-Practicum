import { getStudentCourse } from '@/actions/course.action'
import Header from '@/app/[lng]/instructor/_components/header'
import ProgressCourseCard from '@/components/cards/progress-course.card'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

async function Page({ params }: LngParams) {
	const { userId } = auth()
	const { t } = await translation(params.lng)
	const data = await getStudentCourse(userId!)
	
	return (
		<>
			<Header title={t('myCourses')} description={t('myCoursesDescription')} />
			
			<div className='mt-4 grid xl:grid-cols-3 max-xl:grid-cols-2 gap-4 max-md:grid-cols-1'>
				{data.allCourses.map(item => (
					<ProgressCourseCard
						key={item._id}
						course={JSON.parse(JSON.stringify(item.course))}
						progress={item.progress}
					/>
				))}
			</div>
		</>
	)
}

export default Page
