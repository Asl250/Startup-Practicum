import { getUserMassages } from '@/actions/massage.action'
import Header from '@/app/[lng]/instructor/_components/header'
import MassageCard from '@/components/cards/massage.card'
import NoResult from '@/components/shared/no-result'
import { translation } from '@/i18n/server'
import { LngParams } from '@/types'
import { auth } from '@clerk/nextjs/server'

async function Page({ params }: LngParams) {
	const { userId } = auth()
	const { t } = await translation(params.lng)
	const massages = await getUserMassages(userId!)
	
	return (
		<div className={'p-1'}>
			<Header title={'massages'} description={'massages'} />
			{massages.length === 0 ? (
				<NoResult
					title={t('noReviews')}
					description={t('noReviewsDescription')}
				/>
			) : <div className='mt-4 flex max-w-xl flex-col space-y-3'>
				{massages.map(massage => (
					<MassageCard
						key={massage._id}
						massage={JSON.parse(JSON.stringify(massage))}
						isProfile
					/>
				))}
			</div>
			}
		</div>
	)
}

export default Page
