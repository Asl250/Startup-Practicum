import { attachPayment, getCustomer } from '@/actions/customer.action'
import PaymentForm from '@/components/forms/payment.form'
import FillLoading from '@/components/shared/fill-loading'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { usePaymentMethod } from '@/hooks/use-payment-method'
import useTranslate from '@/hooks/use-translate'
import { addressSchema } from '@/lib/validation'
import { useAuth } from '@clerk/nextjs'
import { loadStripe } from '@stripe/stripe-js'
import {
	CardNumberElement,
	Elements,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js'
import { AlertCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'

const stripePromise = loadStripe(
	'pk_test_51OiHOdKXUy1FiHyAvpEnP450N9DqTUQ6sB8X2Lz04mZAzt7wlkf5NLtzSHxYIJhqk3tdj9bHhIFt1Is2QDXw0I1000HW2NXSZC'
)

function PaymentMethodModal() {
	const { isOpen, onClose } = usePaymentMethod()
	
	
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='max-w-2xl'>
				<Elements stripe={stripePromise}>
					<StripeElement />
				</Elements>
			</DialogContent>
		</Dialog>
	)
}
export default PaymentMethodModal

function StripeElement() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	
	const elements = useElements()
	const stripe = useStripe()
	const t = useTranslate()
	const { userId } = useAuth()
	const pathname = usePathname()
	const { onClose } = usePaymentMethod()
	
	const onSubmit = async (values: z.infer<typeof addressSchema>) => {
		if (!stripe || !elements) return null
		setLoading(true)
		
		const { address, city, fullName, zip } = values
		
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardNumberElement)!,
			billing_details: {
				name: fullName,
				address: { line1: address, city, postal_code: zip },
			},
		})
		
		if (error) {
			setError(`${t('paymentError')} ${error.message}`)
			setLoading(false)
		} else {
			const customer = await getCustomer(userId!)
			await attachPayment(paymentMethod.id, customer.id, pathname)
			onClose()
			setError('')
			setLoading(false)
		}
	}
	
	return (
		<>
			{loading && <FillLoading />}
			{error && (
				<Alert variant='destructive' className='mb-4'>
					<AlertCircle className='size-4' />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}
			
			<PaymentForm isProfile onHandler={onSubmit} />
		</>
	)
}
