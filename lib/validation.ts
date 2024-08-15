import {z} from 'zod'

export const contactSchema = z
	.object({
		email: z.string().email(),
		message: z.string().min(20).max(1000),
		name: z.string().min(3).max(50),
	})
