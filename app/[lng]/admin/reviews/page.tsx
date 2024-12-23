import { getAdminReviews } from '@/actions/review.action'
import { SearchParamsProps } from '@/app.types'
import Header from '@/app/[lng]/instructor/_components/header'
import InstructorReviewCard from '@/components/cards/instructor-review.card'
import Pagination from '@/components/shared/pagination'

async function Page({ searchParams }: SearchParamsProps) {
	const page = searchParams.page ? +searchParams.page : 1
	const reviewData = await getAdminReviews({ page, pageSize: 9 })
	
	return (
		<>
			<Header
				title='All Reviews'
				description='Here are all the reviews you have'
			/>
			
			<div className='mt-4 rounded-md bg-background p-4'>
				<div className='flex flex-col space-y-3'>
					{reviewData.reviews.map(review => (
						<InstructorReviewCard
							key={review._id}
							review={JSON.parse(JSON.stringify(review))}
						/>
					))}
				</div>
				
				<div className='mt-6'>
					<Pagination isNext={reviewData.isNext} pageNumber={page} />
				</div>
			</div>
		</>
	)
}

export default Page
