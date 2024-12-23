'use server'

import type { GetMassagesParams } from '@/actions/types'
import type { IMassage } from '@/app.types'
import Course from '@/database/course.model'
import Massage from '@/database/massage.model'
import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'

export const createMassage = async (
	data : Partial<IMassage>,
	clerkId: string,
	course: string
) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId })
		await Massage.create({ user: user._id, course, ...data })
	} catch (err) {
		throw new Error("Something went wrong when creating massage")
	}
}


export const getMassage = async (params: GetMassagesParams) => {
	try {
		await connectToDatabase()
		const { page = 1, pageSize = 9, clerkId } = params
		
		const skipAmount = (page - 1) * pageSize
		
		const user = await User.findOne({ clerkId })
		const courses = await Course.find({ instructor: user._id })
		
		const massage = await Massage.find({ course: { $in: courses } })
			.sort({ createdAt: -1 })
			.populate({
				path: 'user',
				model: User,
				select: 'fullName picture clerkId',
			})
			.populate({ path: 'course', model: Course, select: 'title' })
			.skip(skipAmount)
			.limit(pageSize)
		
		const totalMassages = await Massage.find({
			course: { $in: courses },
		}).countDocuments()
		
		const isNext = totalMassages > skipAmount + massage.length
		
		return { massage, isNext, totalMassages }
	} catch (error) {
		throw new Error('Error getting reviews')
	}
}

export const getUserMassages = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({clerkId}).select('_id')
		
		return await Massage.find({ user: user._id })
			.sort({ createdAt: -1 })
			.populate({ path: 'user', model: User, select: 'fullName picture' })
			.populate({ path: 'course', model: Course, select: 'title' })
		
	} catch (err) {
		throw new Error('something went wrong')
	}
}

export const deleteMassage = async (id: string, path: string) => {
	try {
		await connectToDatabase()
		await Massage.findByIdAndDelete(id)
		revalidatePath(path)
	} catch (error) {
		throw new Error('Error deleting massage')
	}
}
