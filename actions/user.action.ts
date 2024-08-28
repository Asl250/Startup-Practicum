'use server'

import type { ICreateUser, IUpdateUser } from '@/actions/types'
import Course from '@/database/course.model'
import Review from '@/database/review.model'
import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'
import { cache } from 'react'

export const CreateUser = async (data: ICreateUser) => {
	try {
		await connectToDatabase()
		const {clerkId, email, fullName, picture} = data
		const isExist = await User.findOne({clerkId})
		
		if (isExist) {
			const updatedUser = await User.findOneAndUpdate(
				{email},
				{fullName, picture, clerkId},
				{new: true}
			)
			return updatedUser
		}
		
		const newUser = User.create(data)
		return newUser
		
	}catch (err) {
		throw new Error("Something went wrong when creating user")
	}
}

export const UpdateUser = async (data: IUpdateUser) => {
	try {
		await connectToDatabase()
		const {clerkId, updatedData} = data
		
		const updatedUser = await User.findOneAndUpdate(
			{clerkId: clerkId},
			updatedData,
			{new: true}
		)
		return updatedUser
		
	}catch (err) {
		throw new Error("Something went wrong when updating user")
	}
}

export const getUserById = cache(async (clerkId: string) => {
	try {
		await connectToDatabase()
		return await User.findOne({ clerkId })
	} catch (error) {
		throw new Error('Error fetching user. Please try again.')
	}
})

export const updateUser = async (data: IUpdateUser) => {
	try {
		await connectToDatabase()
		const { clerkId, updatedData, path } = data
		const updatedUser = await User.findOneAndUpdate({ clerkId }, updatedData)
		if (path) return revalidatePath(path)
		return updatedUser
	} catch (error) {
		throw new Error('Error updating user. Please try again.')
	}
}

export const getUserReviews = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({clerkId}).select('_id')

		return await Review.find({ user: user._id })
			.sort({ createdAt: -1 })
			.populate({ path: 'user', model: User, select: 'fullName picture' })
			.populate({ path: 'course', model: Course, select: 'title' })
		
	} catch (err) {
		throw new Error('something went wrong')
	}
}
