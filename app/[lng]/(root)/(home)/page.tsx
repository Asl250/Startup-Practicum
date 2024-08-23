import { getFeaturedCourses } from '@/actions/course.action'
import Categories from '@/app/[lng]/(root)/(home)/_components/categories'
import FeaturedCourses from '@/app/[lng]/(root)/(home)/_components/featured-courses'
import Hero from '@/app/[lng]/(root)/(home)/_components/hero'
import Instructor from '@/app/[lng]/(root)/(home)/_components/instructor'
import LearningJourney from '@/app/[lng]/(root)/(home)/_components/learning-journey'

const Home = async () => {
	const coursesJSON = await getFeaturedCourses()
	const courses = JSON.parse(JSON.stringify(coursesJSON))
	
	return (
		<>
			<Hero />
			{courses.length > 3 && <FeaturedCourses courses={courses}/>}
			<Categories/>
			<Instructor/>
			<LearningJourney/>
		</>
	)
}
export default Home
