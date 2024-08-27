'use server'


import { attachPayment, createCustomer, getCustomer } from '@/actions/customer.action'
import { connectToDatabase } from '@/lib/mongoose'
import stripe from '@/lib/stripe'
import { generateNumericId } from '@/lib/utils'

export const payment = async (
	price: number,
	clerkId: string,
	paymentMethod: string
) => {
	try {
		await connectToDatabase()
		const customer = await getCustomer(clerkId)
		await attachPayment(paymentMethod, customer.id)
		
		const paymentIntent = await stripe.paymentIntents.create({
			amount: price * 100,
			currency: 'usd',
			customer: customer.id,
			payment_method: paymentMethod,
			metadata: { orderId: generateNumericId() },
		})
		
		return paymentIntent.client_secret
	} catch (error) {
		const result = error as Error
		throw new Error(result.message)
	}
}

// pi = payment intent
export const retrievePayment = async (pi: string) => {
	try {
		return await stripe.paymentIntents.retrieve(pi, {
			expand: ['payment_method'],
		})
	} catch (err) {
		const result = err as Error
		throw new Error(result.message)
	}
}
