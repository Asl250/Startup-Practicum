"use server"

import type { ICreateUser, IUpdateUser } from '@/actions/types'
import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'

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
