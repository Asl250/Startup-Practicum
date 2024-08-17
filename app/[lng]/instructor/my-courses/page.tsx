import { getCourses } from '@/actions/course.action'
import Header from '@/app/[lng]/instructor/_components/header'
import InstructorCourseCard from '@/components/cards/instructor-course.card'

async function Page () {
	const courses = await getCourses()
	
	return (
		<div>
			<Header title='My courses' description='Here are your latest courses' />
			<div className={'grid grid-cols-3 gap-4 mt-4'}>
				{courses.map(item => (
					<InstructorCourseCard
						key={item._id}
						course={JSON.parse(JSON.stringify(item))}
					/>
				))}
			</div>
			
		</div>
	)
}
export default Page
