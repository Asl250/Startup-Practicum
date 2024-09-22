'use client'

import { createMassage, getMassage } from '@/actions/massage.action'
import type { IMassage } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import useTranslate from '@/hooks/use-translate'
import { useMassage } from '@/hooks/useMassage'
import { massageSchema } from '@/lib/validation'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner'
import { z } from 'zod'

const MassageModal = () => {
	const {isOpenMassage, onCloseMassage, isLoadingMassage, startLoadingMassage, stopLoadingMassage} = useMassage()
	
	const [massage, setMassage] = useState<IMassage | null>(null)
	
	const {userId} = useAuth()
	const {courseId} = useParams()
	
	const t = useTranslate()
	
	
	const form = useForm<z.infer<typeof massageSchema>>({
		resolver: zodResolver(massageSchema),
		defaultValues: { data: '' },
	})
	
	const onSubmit = async (values: z.infer<typeof massageSchema>) => {
		startLoadingMassage()
		
		const data = { ...values }
		
		const promise = createMassage(data, userId!, `${courseId}`)
		
		promise.then(() => onCloseMassage()).finally(() => stopLoadingMassage())
		
		
		toast.promise(promise, {
			loading: t('loading'),
			success: t('successfully'),
			error: t('error'),
		})
	}
	
	useEffect(() => {
		async function fetchMassage() {
			startLoadingMassage()
			const res = await getMassage(`${courseId}`, userId!)
			if (res) {
				setMassage(res)
				form.setValue('data', res.data)
			}
			stopLoadingMassage()
		}
		fetchMassage()
		
	}, [isOpenMassage])
	
	return (
		<>
			<Toaster richColors theme={'dark'} position={'top-center'}/>
			<Dialog open={isOpenMassage} onOpenChange={onCloseMassage}>
				<DialogContent>
					{isLoadingMassage && <FillLoading />}
					<div className='flex flex-col items-center justify-center space-y-4'>
						<div className='mt-4 font-spaceGrotesk text-xl font-medium'>
							{massage
								? t('changeReview')
								: massage
									? t('whyReview')
									: t('rateCourse')
							}
						</div>
						
						{massage ? (
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
														disabled={isLoadingMassage}
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
											disabled={isLoadingMassage}
											className='font-spaceGrotesk font-bold'
										>
											{massage ? t('change') : t('submit')}
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
export default MassageModal
