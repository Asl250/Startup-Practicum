'use server'

import { connectToDatabase } from '@/lib/mongoose'
import stripe from '@/lib/stripe'

export const payment  = async (price: number) => {
	try {
		await connectToDatabase()
		const paymentIntent = await stripe.paymentIntents.create({
			amount: price * 100,
			currency: 'usd',
		})
		
		return paymentIntent.client_secret
	} catch (err) {
		throw new Error("Something went wrong when creating payment")
	}
}
