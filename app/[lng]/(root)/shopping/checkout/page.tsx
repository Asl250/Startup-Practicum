import CheckoutElement from '@/app/[lng]/(root)/shopping/checkout/_components/checkout-element'
import TopBar from "@/components/shared/top-bar"
import { translation } from '@/i18n/server'
import type { LngParams } from '@/types'

async function Page({ params }: LngParams) {
	const { t } = await translation(params.lng)
	
	return (
		<>
			<TopBar label={'shoppingCart'} extra={t('checkout')} />
			<CheckoutElement/>
		</>
	)
}
export default Page
