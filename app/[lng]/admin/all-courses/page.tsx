import { getAdminCourses } from '@/actions/course.action'
import { SearchParamsProps } from '@/app.types'
import Header from '@/app/[lng]/instructor/_components/header'
import AdminCourseCard from '@/components/cards/admin-course.card'
import Pagination from '@/components/shared/pagination'

async function Page({ searchParams }: SearchParamsProps) {
	const page = searchParams.page ? +searchParams.page : 1
	const courseData = await getAdminCourses({ page, pageSize: 9 })
	
	return (
		<>
			<Header
				title='All Courses'
				description='Here are all the courses you have'
			/>
			
			<div className='mt-4 grid grid-cols-3 gap-4'>
				{courseData.courses.map(item => (
					<AdminCourseCard
						key={item._id}
						course={JSON.parse(JSON.stringify(item))}
					/>
				))}
			</div>
			<div className='mt-6'>
				<Pagination pageNumber={page} isNext={courseData.isNext} />
			</div>
		</>
	)
}

export default Page
