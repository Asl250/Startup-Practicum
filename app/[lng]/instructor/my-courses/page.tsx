import { getCourses } from '@/actions/course.action'
import type { SearchParamsProps } from '@/app.types'
import Header from '@/app/[lng]/instructor/_components/header'
import InstructorCourseCard from '@/components/cards/instructor-course.card'
import Pagination from '@/components/shared/pagination'
import { auth } from '@clerk/nextjs/server'

async function Page ({searchParams} : SearchParamsProps) {
	const {userId} = auth()
	const page = searchParams.page ? +searchParams.page : 1
	const result = await getCourses({ clerkId: userId!, page })
	
	return (
		<div>
			<Header title='My courses' description='Here are your latest courses' />
			<div className={'grid grid-cols-3 gap-4 mt-4'}>
				{result.courses.map(item => (
					<InstructorCourseCard
						key={item._id}
						course={JSON.parse(JSON.stringify(item))}
					/>
				))}
			</div>
			<div className='mt-6'>
				<Pagination pageNumber={page} isNext={result.isNext} />
			</div>
		</div>
	)
}

export default Page
