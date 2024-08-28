import { getUserReviews } from '@/actions/user.action'
import Header from '@/app/[lng]/instructor/_components/header'
import InstructorReviewCard from '@/components/cards/instructor-review.card'
import NoResult from '@/components/shared/no-result'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import { auth } from '@clerk/nextjs/server'

async function Page({ params }: LngParams) {
	const { userId } = auth()
	const { t } = await translation(params.lng)
	const reviews = await getUserReviews(userId!)
	
	return (
		<div className={'p-1'}>
			<Header title={t('review')} description={t('reviewDescription')} />
			{reviews.length === 0 && (
				<NoResult
					title={t('noReviews')}
					description={t('noReviewsDescription')}
				/>
			)}
			
			<div className='mt-4 flex max-w-xl flex-col space-y-3'>
				{reviews.map(review => (
					<InstructorReviewCard
						key={review._id}
						review={JSON.parse(JSON.stringify(review))}
						isProfile
					/>
				))}
			</div>
		</div>
	)
}

export default Page
