"use client"

import Categories from '@/app/[lng]/(root)/(home)/_components/categories'
import FeaturedCourses from '@/app/[lng]/(root)/(home)/_components/featured-courses'
import Hero from '@/app/[lng]/(root)/(home)/_components/hero'
import Instructor from '@/app/[lng]/(root)/(home)/_components/instructor'
import LearningJourney from '@/app/[lng]/(root)/(home)/_components/learning-journey'

const Home =  () => {
	return (
		<>
			<Hero />
			<FeaturedCourses/>
			<Categories/>
			<Instructor/>
			<LearningJourney/>
		</>
	)
}
export default Home
