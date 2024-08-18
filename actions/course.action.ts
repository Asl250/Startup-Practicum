"use server"

import type { ICreateCourse } from '@/actions/types'
import type { ICourse } from '@/app.types'
import Course from '@/database/course.model'
import User from '@/database/user.model'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'

export const createCourse = async (data: ICreateCourse, clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({clerkId})
		await Course.create({...data, instructor: user._id})
		revalidatePath('/en/instructor/my-courses')
	}catch (error) {
		throw new Error("Something went wrong when creating course")
	}
}

export const getCourses = async (clerkId: string) => {
	try {
		await connectToDatabase()
		const user = await User.findOne({clerkId})
		const courses = await Course.find({instructor: user._id})
		return courses as ICourse[]
	
	}catch (err) {
		throw new Error("Something went wrong when getting courses")
	}
}

export const getCourseByid = async (id: string) => {
	try {
		await connectToDatabase()
		return await Course.findById(id) as ICourse
	
	}catch (err) {
		throw new Error("Something went wrong when getting courses by id")
	}
}

export const updateStatusCourse = async (id: string, status: boolean, path: string) => {

	try {
		await connectToDatabase()
		await Course.findByIdAndUpdate(id, {published:status})
		revalidatePath(path)
	}catch (err) {
		throw new Error("Something went wrong when updating course status")
	}
}

export const deleteCourse = async (id: string, path: string) => {
	try {
		await connectToDatabase()
		await Course.findByIdAndDelete(id)
		revalidatePath(path)
	} catch (err) {
		throw new Error("Something went wrong when deleting course")
	}
}
