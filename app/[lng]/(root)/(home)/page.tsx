import { getFeaturedCourses } from '@/actions/course.action'
import { getAdminInstructors } from '@/actions/user.action'
import Categories from '@/app/[lng]/(root)/(home)/_components/categories'
import FeaturedCourses from '@/app/[lng]/(root)/(home)/_components/featured-courses'
import Hero from '@/app/[lng]/(root)/(home)/_components/hero'
import Instructor from '@/app/[lng]/(root)/(home)/_components/instructor'
import LearningJourney from '@/app/[lng]/(root)/(home)/_components/learning-journey'

const Home = async () => {
	const courses= await getFeaturedCourses()
	const instructorsData = await getAdminInstructors({pageSize: 4})
	
	return (
		<>
				<div
					className="bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]">
					<Hero />
					{courses.length > 3 && <FeaturedCourses courses={JSON.parse(JSON.stringify(courses))} />}
					<Categories />
					<Instructor instructors={JSON.parse(JSON.stringify(instructorsData.instructors))} />
					<LearningJourney />
				</div>
			
		</>
	)
}
export default Home
