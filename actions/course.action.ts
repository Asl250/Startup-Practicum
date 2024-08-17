"use server"

import type { ICreateCourse } from '@/actions/types'
import type { ICourse } from '@/app.types'
import Course from '@/database/course.model'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'

export const createCourse = async (data: ICreateCourse) => {
	try {
		await connectToDatabase()
		await Course.create(data)
		revalidatePath('/en/instructor/my-courses')
	}catch (error) {
		throw new Error("Something went wrong when creating course")
	}
}

export const getCourses = async () => {
	try {
		await connectToDatabase()
		const courses = await Course.find()
		return courses as ICourse[]
	
	}catch (err) {
		throw new Error("Something went wrong when getting courses")
	}
}
