'use client'

import { createMassage } from '@/actions/massage.action'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import useTranslate from '@/hooks/use-translate'
import { useMassage } from '@/hooks/useMassage'
import { massageSchema } from '@/lib/validation'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast, Toaster } from 'sonner'
import { z } from 'zod'

const ReviewModal = () => {
	const {isOpenMassage, onCloseMassage, isLoadingMassage, stopLoadingMassage} = useMassage()
	
	const {userId} = useAuth()
	const {courseId} = useParams()
	

	const t = useTranslate()


	const form = useForm<z.infer<typeof massageSchema>>({
		resolver: zodResolver(massageSchema),
		defaultValues: { data: '' },
	})

	const onSubmit = async (values: z.infer<typeof massageSchema>) => {

		const data = { ...values }
		let promise
		if (data.data !== ''){
			promise = createMassage(data, userId!, `${courseId}`)
			
			promise.then(() => onCloseMassage()).finally(() => stopLoadingMassage())
			
			
			toast.promise(promise, {
				loading: t('loading'),
				success: t('successfully'),
				error: t('error'),
			})
		} else (
			toast.error('Please write your massage')
		)


	}

	return (
		<>
			<Toaster richColors theme={'dark'} position={'top-center'}/>
			<Dialog open={isOpenMassage} onOpenChange={onCloseMassage}>
				<DialogContent>
					{isLoadingMassage && <FillLoading />}
					<div className='flex flex-col items-center justify-center space-y-4'>
						<div className='mt-4 font-spaceGrotesk text-xl font-medium'>
						</div>
						
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
													<Input
														className='h-16 resize-none border-none bg-secondary font-medium'
														placeholder={'write your massage'}
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
											{t('submit')}
										</Button>
									</div>
								</form>
							</Form>
					</div>
				</DialogContent>
			</Dialog>
		</>
	
	)
}
export default ReviewModal
