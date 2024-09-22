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

export const getMassage = async (course: string, clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({ clerkId })
		const massage = await Massage.findOne({ user: user._id, course })
		return JSON.parse(JSON.stringify(massage))
	} catch (err) {
		throw new Error("Something went wrong when getting massage")
	}
}

export const getCourseMassages = async (course: string) => {
	try {
		await connectToDatabase()
		const massages = await Massage.find({ course })
			.sort({ createdAt: -1 })
			.populate({ path: 'user', model: User, select: 'fullName picture' })
			.populate({ path: 'course', model: Course, select: 'title' })
		
		return JSON.parse(JSON.stringify(massages))
	} catch (error) {
		throw new Error('Error getting massage')
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
