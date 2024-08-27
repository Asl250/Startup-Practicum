import { getCustomerCarts } from '@/actions/customer.action'
import CheckoutElement from '@/app/[lng]/(root)/shopping/checkout/_components/checkout-element'
import TopBar from "@/components/shared/top-bar"
import { translation } from '@/i18n/server'
import type { LngParams } from '@/types'
import { auth } from '@clerk/nextjs/server'

async function Page({ params }: LngParams) {
	const { t } = await translation(params.lng)
	const {userId} = auth()
	
	const cards = await getCustomerCarts(userId!)
	
	return (
		<>
			<TopBar label={'shoppingCart'} extra={t('checkout')} />
			<CheckoutElement cards={JSON.parse(JSON.stringify(cards))}/>
		</>
	)
}
export default Page
