import { getNotifications } from '@/actions/notification'
import Header from '@/app/[lng]/instructor/_components/header'
import ClearButton from '@/app/[lng]/profile/notifications/_components/clear-button'
import NotificationCard from '@/components/cards/notification.card'
import NoResult from '@/components/shared/no-result'
import { translation } from '@/i18n/server'
import type { LngParams } from '@/types'
import { auth } from '@clerk/nextjs/server'

async function Page({ params }: LngParams) {
	const { t } = await translation(params.lng)
	const { userId } = auth()
	const notifications = await getNotifications(userId!)
	
	return (
		<>
			<Header
				title={t('notifications')}
				description={t('notificationDescription')}
			/>
			
			<div className='mt-4 flex flex-col space-y-2'>
				{notifications.length === 0 && (
					<NoResult
						title={t('noNotifications')}
						description={t('noNotificationsDescription')}
					/>
				)}
				{notifications.map(n => (
					<NotificationCard key={n._id} item={JSON.parse(JSON.stringify(n))} />
				))}
				{notifications.length > 0 && <ClearButton />}
			</div>
		</>
	)
}
export default Page
