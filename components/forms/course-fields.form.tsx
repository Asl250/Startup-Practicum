'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { courseCategory, courseLanguage, courseLevels } from '@/constants'
import { storage } from '@/lib/firebase'
import { courseSchema } from '@/lib/validation'
import { useUser } from '@clerk/nextjs'
import { getDownloadURL, ref, uploadString } from '@firebase/storage'
import { uuidv4 } from '@firebase/util'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageDown } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createCourse } from '@/actions/course.action'
import { toast, Toaster } from 'sonner'
import { z } from 'zod'

const CourseFieldsForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [previewImage, setPreviewImage] = useState("")
	const [open, setOpen] = useState(false)
	
	const router = useRouter()
	const {user} = useUser()
	
	const form = useForm<z.infer<typeof courseSchema>>({
		resolver: zodResolver(courseSchema),
		defaultValues: defaultValue,
	})
	
	function onUpload(e: ChangeEvent<HTMLInputElement>) {
		const files = e.target.files
		if (!files) return '!files'
		const file = files[0]
	
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = (e) => {
			const refs = ref(storage, `/praktikum/course/${uuidv4()}`)
			const result = e.target?.result as string
			const promise = uploadString(refs, result, 'data_url')
				.then(() => getDownloadURL(refs)).then(url => setPreviewImage(url))
			toast.promise(promise, {
				loading: 'Loading...',
				success: 'Successfully uploaded!',
				error: 'Something went wrong!',
			})
		}
	}
	
	function onSubmit(values: z.infer<typeof courseSchema>) {
		if (!previewImage) return toast.error('Please upload a file')
		setIsLoading(true)
		const { oldPrice, currentPrice } = values
		const promise = createCourse(
			{
				...values,
				oldPrice: +oldPrice,
				currentPrice: +currentPrice,
				previewImage,
			}, user?.id as string
		).then(() => {
			form.reset()
			router.push('/en/instructor/my-courses')
		},).finally(() => setIsLoading(false))
		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully created!',
			error: 'Something went wrong!',
		})
	}
	return (
		<>
			<Toaster position={'top-center'} theme={'dark'}/>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-3'}>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Course title<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading}
										{...field}
										className='bg-secondary'
										placeholder='Learn ReactJS - from 0 to hero'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					
					<FormField
						control={form.control}
						name='description'
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Short description<span className='text-red-500'>*</span>
								</FormLabel>
								<FormControl>
									<Textarea
										disabled={isLoading}
										{...field}
										className='h-44 bg-secondary'
										placeholder='Description'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					
					<div className='grid grid-cols-2 gap-4'>
						<FormField
							control={form.control}
							name='learning'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										What will students learn in your course?
										<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											disabled={isLoading}
											{...field}
											className='bg-secondary'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='requirements'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Requirements
										<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											disabled={isLoading}
											{...field}
											className='bg-secondary'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					
					
					<div className={'grid grid-cols-3 gap-4'}>
						<FormField
							control={form.control}
							name='level'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Level<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Select
											disabled={isLoading}
											defaultValue={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger className='w-full bg-secondary'>
												<SelectValue placeholder={'Select'} />
											</SelectTrigger>
											<SelectContent>
												{courseLevels.map(item => (
													<SelectItem key={item} value={item}>
														{item}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						<FormField
							control={form.control}
							name='category'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Category<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Select
											disabled={isLoading}
											defaultValue={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger className='w-full bg-secondary'>
												<SelectValue placeholder={'Select'} />
											</SelectTrigger>
											<SelectContent>
												{courseCategory.map(item => (
													<SelectItem key={item} value={item}>
														{item}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
						
						<FormField
							control={form.control}
							name='language'
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Language<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Select
											disabled={isLoading}
											defaultValue={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger className='w-full bg-secondary'>
												<SelectValue placeholder={'Select'} />
											</SelectTrigger>
											<SelectContent>
												{courseLanguage.map(item => (
													<SelectItem key={item} value={item}>
														{item}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={'oldPrice'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Old Price<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											{...field}
											className='bg-secondary'
											type={'number'}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={'currentPrice'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Current Price<span className='text-red-500'>*</span>
									</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											{...field}
											className='bg-secondary'
											type={'number'}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						
								<FormItem>
									<FormLabel>
										Preview image<span className='text-red-500'>*</span>
									</FormLabel>
										<Input
											onChange={onUpload}
											disabled={isLoading}
											className='bg-secondary'
											type={'file'}
										/>
								</FormItem>
					
					</div>
					
					<div className={'flex justify-end gap-4'}>
						<Button
							disabled={isLoading}
							type={'button'}
							variant={'destructive'}
							onClick={() => form.reset()}
						>
							Clear
						</Button>
						<Button
							disabled={isLoading}
							type={'submit'}
						>
							Submit
						</Button>
						{previewImage && (
							<Button type={'button'} variant={'outline'} onClick={() => setOpen(true)}>
								<span>Image</span>
								<ImageDown className={'ml-2 size-2'}/>
							</Button>
						)}
						
					</div>
				
				</form>
			</Form>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<div className={'relative h-64 '}>
						<Image src={previewImage} alt={'preview'} fill />
					</div>
					<Button className={'w-fit'} variant={'destructive'} onClick={() => {
						setPreviewImage('')
						setOpen(false)
					}}>Remove</Button>
				</DialogContent>
			</Dialog>
		</>
		
	)
}
export default CourseFieldsForm

const defaultValue = {
	title: '',
	description: '',
	learning: '',
	requirements: '',
	level: '',
	category: '',
	language: '',
	oldPrice: '',
	currentPrice: '',
}
