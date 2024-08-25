'use client'

import { createReview, getReview, updateReview } from '@/actions/review.action'
import type { IReview } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import useTranslate from '@/hooks/use-translate'
import { useReview } from '@/hooks/useReview'
import { reviewSchema } from '@/lib/validation'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactStars from 'react-stars'
import { toast, Toaster } from 'sonner'
import { z } from 'zod'

const ReviewModal = () => {
	const [rating, setRating] = useState(5)
	const {isOpen, onClose, isLoading, startLoading, stopLoading} = useReview()
	
	const [review, setReview] = useState<IReview | null>(null)
	
	const {userId} = useAuth()
	const {courseId} = useParams()
	
	const t = useTranslate()
	
	
	const form = useForm<z.infer<typeof reviewSchema>>({
		resolver: zodResolver(reviewSchema),
		defaultValues: { data: '' },
	})
	
	const onSubmit = async (values: z.infer<typeof reviewSchema>) => {
		startLoading()
		
		const data = { ...values, rating }
		
		let promise;
		if (review) {
			promise = updateReview({ ...data, _id: review._id })
		} else {
			promise = createReview(data, userId!, `${courseId}`)
		}
		
		promise.then(() => onClose()).finally(() => stopLoading())
		
		
		toast.promise(promise, {
			loading: t('loading'),
			success: t('successfully'),
			error: t('error'),
		})
	}
	
	useEffect(() => {
		async function fetchReview() {
			startLoading()
			const res = await getReview(`${courseId}`, userId!)
			if (res) {
				setRating(res.rating)
				setReview(res)
				form.setValue('data', res.data)
			}
			stopLoading()
		}
		fetchReview()
		
	}, [isOpen])
		
		return (
			<>
				<Toaster richColors theme={'dark'} position={'top-center'}/>
				<Dialog open={isOpen} onOpenChange={onClose}>
					<DialogContent>
						{isLoading && <FillLoading />}
						<div className='flex flex-col items-center justify-center space-y-4'>
							<div className='mt-4 font-spaceGrotesk text-xl font-medium'>
								{review
									? t('changeReview')
									: rating
										? t('whyReview')
										: t('rateCourse')
								}
							</div>
							
							<ReactStars
								size={30}
								color2='#E59819'
								value={rating}
								onChange={val => setRating(val)}
							/>
							
							{rating ? (
								<Form {...form}>
									<form
										onSubmit={form.handleSubmit(onSubmit)}
										className='flex w-full flex-col gap-4'
									>
										<FormField
											control={form.control}
											name='data'
											render={({ field }) => (
												<FormItem className='flex w-full flex-col'>
													<FormControl>
														<Textarea
															className='h-36 resize-none border-none bg-secondary font-medium'
															placeholder={t('reviewPlaceholder')}
															disabled={isLoading}
															{...field}
														/>
													</FormControl>
													<FormMessage className='text-red-500' />
												</FormItem>
											)}
										/>
										
										<div className='flex justify-end'>
											<Button
												type='submit'
												disabled={isLoading}
												className='font-space-grotesk font-bold'
											>
												{review ? t('change') : t('submit')}
											</Button>
										</div>
									</form>
								</Form>
							) : null}
						</div>
					</DialogContent>
				</Dialog>
			</>
		
)
}
export default ReviewModal
