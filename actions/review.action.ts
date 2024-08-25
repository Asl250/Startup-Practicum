'use server'

import type { IReview } from '@/app.types'
import Review from '@/database/review.model'
import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'

export const createReview = async (
	data : Partial<IReview>,
	clerkId: string,
	course: string
) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId })
		await Review.create({ user: user._id, course, ...data })
	} catch (err) {
		throw new Error("Something went wrong when creating review")
	}
}

export const getReview = async (course: string, clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId })
		const review = await Review.findOne({ user: user._id, course })
		return JSON.parse(JSON.stringify(review))
	} catch (err) {
		throw new Error("Something went wrong when getting review")
	}
}

export const updateReview = async (data: Partial<IReview>) => {
	try {
		await connectToDatabase()
		await Review.findByIdAndUpdate(data._id, data)
	} catch (error) {
		throw new Error('Error updating review')
	}
}
