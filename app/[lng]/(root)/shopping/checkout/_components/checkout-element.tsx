'use client'

import { applyCoupon } from '@/actions/payment.action'
import type { ICard } from '@/app.types'
import Checkout from '@/app/[lng]/(root)/shopping/checkout/_components/checkout'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/hooks/use-card'
import useTranslate from '@/hooks/use-translate'
import { couponSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { X } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'


const stripePromise = loadStripe(
	'pk_test_51OiHOdKXUy1FiHyAvpEnP450N9DqTUQ6sB8X2Lz04mZAzt7wlkf5NLtzSHxYIJhqk3tdj9bHhIFt1Is2QDXw0I1000HW2NXSZC'
)

interface Props {
	cards: ICard[]
}

const CheckoutElement = ({cards}: Props) => {
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [coupon, setCoupon] = useState(0)
	
	
	const t = useTranslate()
	
	const { totalPrice, taxes, carts } = useCart()
	
	if (totalPrice() === 0) return  redirect('/shopping/cart')
	
	
	
	const form = useForm<z.infer<typeof couponSchema>>({
		resolver: zodResolver(couponSchema),
		defaultValues: {},
	})
	
	const onSubmit = async ({ code }: z.infer<typeof couponSchema>) => {
		setLoading(true)
		try {
			const res = await applyCoupon(code)
			if (res.valid) {
				setCoupon(res.percent_off)
			}
		} catch (error) {
			const result = error as Error
			setError(result.message)
			setTimeout(() => setError(''), 5000)
		} finally {
			setLoading(false)
		}
	}
	
	const onRemove = () => setCoupon(0)
	
	
	return (
		<div className='container mx-auto mt-12 max-w-6xl'>
			<div className='grid grid-cols-3 gap-2 max-md:grid-cols-1'>
				<div className='col-span-2'>
					<Card className='relative bg-gradient-to-t from-secondary to-background'>
						<CardContent className='py-4'>
							<h1 className='font-spaceGrotesk text-2xl font-bold'>
								{t('checkout')}
							</h1>
							<p className='text-sm text-muted-foreground'>
								{t('fillDetails')}
							</p>
							
							<Elements stripe={stripePromise}>
								<Checkout cards={cards} coupon={coupon}/>
							</Elements>
						</CardContent>
					</Card>
				</div>
				
				<div className='flex flex-col space-y-3'>
					<Card className='relative bg-gradient-to-b from-secondary to-background'>
						{loading && <FillLoading />}
						<CardContent className='py-4'>
							<h1 className='font-spaceGrotesk text-2xl font-bold'>
								{t('applyCoupon')}
							</h1>
							<p className='text-sm text-muted-foreground'>
								{t('applyCouponDescription')}
							</p>
							{coupon > 0 && (
								<div className='mt-2 flex items-center justify-between rounded-md border border-green-500/30 bg-green-500/10 p-2'>
									<p className='font-spaceGrotesk text-sm font-bold text-green-500'>
										{t('appliedCoupon')}: {coupon}%
									</p>
									<Button
										onClick={() => onRemove()}
										size={'icon'}
										className='size-6'
										variant={'ghost'}
									>
										<X className='size-4 text-red-500' />
									</Button>
								</div>
							)}
							<Form {...form}>
								<form
									onSubmit={form.handleSubmit(onSubmit)}
									className='mt-2 flex items-center space-x-2'
								>
									<FormField
										control={form.control}
										name='code'
										render={({ field }) => (
											<FormItem className='flex-1'>
												<FormControl>
													<Input
														className='h-10'
														disabled={loading || coupon > 0}
														placeholder={t('couponCode')}
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<Button
										size={'sm'}
										type='submit'
										disabled={loading || coupon > 0}
									>
										{t('apply')}
									</Button>
								</form>
							</Form>
							{error && (
								<p className='mt-1 font-spaceGrotesk text-sm font-bold text-red-500'>
									{error}
								</p>
							)}
						</CardContent>
					</Card>
					
					<Card className='relative bg-gradient-to-b from-secondary to-background'>
						<CardContent className='py-4'>
							<h1 className='font-spaceGrotesk text-2xl font-bold'>
							{t('orders')}
							</h1>
							<p className='text-sm text-muted-foreground'>
								{t('reviewItems')}
							</p>
							
							<div className={'mt-4 flex flex-col space-y-3'}>
								{carts.map(item => (
									<div
										key={item._id}
										className='flex items-center justify-between border-b pb-2'
									>
										<div className='flex items-center gap-2'>
											<div className='relative size-12 rounded-md bg-gray-300'>
												<Image
													src={item.previewImage}
													alt={item.title}
													fill
													className='object-cover'
												/>
											</div>
											<h1 className='font-spaceGrotesk font-bold'>
												{item.title}
											</h1>
										</div>
										
										<div className='flex items-center gap-2'>
											<h1 className='font-spaceGrotesk text-sm font-bold'>
												{item.currentPrice.toLocaleString('en-US', {
													style: 'currency',
													currency: 'USD',
												})}
											</h1>
										</div>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
					
					<Card className='bg-gradient-to-t from-secondary to-background'>
						<CardContent className='py-4'>
							<h1 className='font-spaceGrotesk text-2xl font-bold'>
								{t('results')}
							</h1>
							<p className='text-sm text-muted-foreground'>
								{t('controlsResult')}
							</p>
							
							<Separator className='my-3' />
							
							
							<div className='flex items-center justify-between text-sm'>
								<div className='font-spaceGrotesk font-bold'>{t('subtotal')}</div>
								<div className='font-medium'>
									{totalPrice(coupon).toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</div>
							</div>
							
							<div className='flex items-center justify-between text-sm'>
								<div className='font-spaceGrotesk font-bold'>{t('taxes')}</div>
								<div className='font-medium'>
									{taxes().toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</div>
							</div>
							
							<div className='flex items-center justify-between text-sm'>
								<div className='font-spaceGrotesk font-bold'>{t('total')}</div>
								<div className='font-medium'>
									{(totalPrice(coupon) + taxes()).toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
									})}
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
export default CheckoutElement
