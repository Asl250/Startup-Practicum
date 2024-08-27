'use server'

import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import stripe from '@/lib/stripe'
import { revalidatePath } from 'next/cache'

export const createCustomer = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId }).select('email fullName')
		const { email, fullName } = user
		
		const customer = await stripe.customers.create({
			email,
			name: fullName,
			metadata: { clerkId },
		})
		
		await User.findOneAndUpdate({ clerkId }, { customerId: customer.id })
		
		return customer
	} catch (error) {
		throw new Error("Couldn't create customer")
	}
}

export const getCustomer = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId }).select('customerId')
		const { _id, customerId } = user
		
		if (!customerId) return await createCustomer(clerkId)
		
		return await stripe.customers.retrieve(customerId)
	} catch (error) {
		throw new Error("Couldn't get customer details")
	}
}

export const attachPayment = async (
	paymentMethod: string,
	customer: string,
	path?: string
) => {
	try {
		path && revalidatePath(path)
		return await stripe.paymentMethods.attach(paymentMethod, { customer })
	} catch (error) {
		const result = error as Error
		throw new Error(result.message)
	}
}

