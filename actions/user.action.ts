'use server'

import type { GetPaginationParams, ICreateUser, IUpdateUser } from '@/actions/types'
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

export const getUser = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId }).select(
			'fullName picture clerkId email role isAdmin'
		)
		if (!user) return 'notFound'
		return JSON.parse(JSON.stringify(user))
	} catch (error) {
		throw new Error('Error fetching user. Please try again.')
	}
}

export const updateUser = async (data: IUpdateUser) => {
	try {
		await connectToDatabase()
		const { clerkId, updatedData, path } = data
		const updatedUser = await User.findOneAndUpdate({ clerkId }, updatedData)
		if (path) return revalidatePath(path)
		return JSON.parse(JSON.stringify(updatedUser))
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

export const getAdminInstructors = async (params: GetPaginationParams) => {
	try {
		await connectToDatabase()
		const { page = 1, pageSize = 3 } = params
		
		const skipAmount = (page - 1) * pageSize
		
		const instructors = await User.find({ role: 'instructor' })
			.skip(skipAmount)
			.limit(pageSize)
			.sort({ createdAt: -1 })
		
		const totalInstructors = await User.countDocuments({ role: 'instructor' })
		const isNext = totalInstructors > skipAmount + instructors.length
		
		return { instructors, isNext, totalInstructors }
	} catch (error) {
		throw new Error('Error getting instructors')
	}
}

export const getInstructors = async () => {
	try {
		await connectToDatabase()
		return await User.find({ approvedInstructor: true }).select(
			'isAdmin role email website youtube github job clerkId'
		)
	} catch (error) {
		throw new Error('Error getting instructors')
	}
}


export const getRole = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const user =  await User.findOne({ clerkId }).select('role isAdmin')
		return JSON.parse(JSON.stringify(user))
	} catch (error) {
		throw new Error('Error getting role')
	}
}
