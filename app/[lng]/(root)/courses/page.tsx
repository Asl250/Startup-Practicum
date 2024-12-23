import { getAllCourses } from '@/actions/course.action'
import type { SearchParamsProps } from '@/app.types'
import AllCourses from '@/app/[lng]/(root)/courses/_components/all-courses'
import TopBar from '@/components/shared/top-bar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Praktikum | Barcha kurslar',
	description:
		"Platformamizda mavjud bo'lgan barcha kurslar ro'yxati. O'zingizga mos kursni toping va o'rganishni boshlang!",
}

const Page = async ({searchParams}: SearchParamsProps) => {
	const resulJSON = await getAllCourses({
		page: searchParams.page ? +searchParams.page : 1,
		filter: searchParams.filter,
		searchQuery: searchParams.q
	})
	
	const result = JSON.parse(JSON.stringify(resulJSON))
	
	return (
		<>
			<TopBar label={'allCourses'} description={'allCourseDescription'} extra={'ReactJs'} />
			<AllCourses result={result}/>
		</>
	)
}
export default Page
