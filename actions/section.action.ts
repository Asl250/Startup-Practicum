"use server"

import type { IUpdateSection } from '@/actions/types'
import Section from '@/database/section.model'
import { connectToDatabase } from '@/lib/mongoose'
import { revalidatePath } from 'next/cache'

export const getSections = async (course: string) => {
	try {
		await connectToDatabase()
		return await Section.find({ course }).sort({ position: 1 })
	} catch (error) {
		throw new Error('Something went wrong when getting sections')
	}
}

export const createSection = async (course: string, title: string, path: string) => {
	try {
		await connectToDatabase()
		const section = await Section.find({ course })
		const position = section.length
		await Section.create({title, course, position})
		revalidatePath(path)
	}catch (err) {
		throw new Error("Something went wrong when creating section")
	}
}

export const updateSection = async (params: IUpdateSection) => {
	try {
		await connectToDatabase()
		const { lists, path } = params
		for (const item of lists) {
			await Section.findByIdAndUpdate(item._id, { position: item.position })
		}
		revalidatePath(path)
	} catch (error) {
		throw new Error('Something went wrong updating section position')
	}
}
