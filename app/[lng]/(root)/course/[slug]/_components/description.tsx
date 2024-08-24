'use client'

import { purchaseCourse } from '@/actions/course.action'
import type { ICourse } from '@/app.types'
import FillLoading from '@/components/shared/fill-loading'
import { Button } from '@/components/ui/button'
import useTranslate from '@/hooks/use-translate'
import { useAuth } from '@clerk/nextjs'
import {
	BarChart2,
	Clock,
	Infinity,
	Languages,
	MonitorPlay,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { GrCertificate } from 'react-icons/gr'
import {BiCategory} from 'react-icons/bi'
import { toast, Toaster } from 'sonner'

function Description(course : ICourse) {
	const t = useTranslate()
	const [isLoading, setIsLoading] = useState(false)
	const {userId} = useAuth()
	const router = useRouter()
	const {lng} = useParams()

	
	const onPurchase = () => {
		setIsLoading(true)
		const promise = purchaseCourse(course._id, userId!)
			.then(() => router.push(`/${lng}/dashboard/${course._id}`))
			.catch(() => setIsLoading(false))
		
		toast.promise(promise, {
			loading: t('loading'),
			success: t('success'),
			error: t('error'),
		})
	}

	return (
		<>
			<Toaster theme={'dark'} position={'top-center'} richColors/>
			<div className='rounded-md border bg-secondary/50 p-4 shadow-lg dark:shadow-white/20 lg:sticky lg:top-24 lg:p-6'>
				<div className='flex items-center justify-between font-space-grotesk'>
					<div className='text-2xl font-bold'>{course.currentPrice.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}</div>
					<div className='font-bold line-through'>{course.oldPrice.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}</div>
				</div>
				
				<Button size={'lg'} className='mt-4 w-full font-bold'>
					{t('addToCart')}
				</Button>
				<Button
					size={'lg'}
					className='mt-2 w-full font-bold'
					variant={'outline'}
					onClick={onPurchase}
					disabled={isLoading}
				>
					{isLoading && <FillLoading/>}
						{t('buyNow')}
				</Button>
				
				<p className='my-3 text-center text-sm text-muted-foreground'>
					{t('guarantee')}
				</p>
				
				<div className='mt-4 flex items-center justify-between border-b pb-2'>
					<div className='flex items-center gap-2 font-space-grotesk'>
						<MonitorPlay className='size-5' />
						<span className='font-bold'>{t('lessons')}</span>
					</div>
					<p className='text-muted-foreground'>{course.totalLessons}</p>
				</div>
				
				<div className='mt-2 flex items-center justify-between border-b pb-2'>
					<div className='flex items-center gap-2 font-space-grotesk'>
						<Clock className='size-5' />
						<span className='font-bold'>{t('durations')}</span>
					</div>
					<p className='text-muted-foreground'>{course.totalDuration} {t('hours')}</p>
				</div>
				
				<div className='mt-2 flex items-center justify-between border-b pb-2'>
					<div className='flex items-center gap-2 font-space-grotesk'>
						<BarChart2 className='size-5' />
						<span className='font-bold'>{t('skillLevel')}</span>
					</div>
					<p className='text-muted-foreground'>{course.level}</p>
				</div>
				
				<div className='mt-2 flex items-center justify-between border-b pb-2'>
					<div className='flex items-center gap-2 font-space-grotesk'>
						<Languages className='size-5' />
						<span className='font-bold'>{t('language')}</span>
					</div>
					<p className='text-muted-foreground'>{course.language}</p>
				</div>
				
				<div className='mt-2 flex items-center justify-between border-b pb-2'>
					<div className='flex items-center gap-2 font-space-grotesk'>
						<BiCategory className='size-5' />
						<span className='font-bold'>{t('category')}</span>
					</div>
					<p className='text-muted-foreground'>{course.category}</p>
				</div>
				
				<div className='mt-2 flex items-center justify-between border-b pb-2'>
					<div className='flex items-center gap-2 font-space-grotesk'>
						<GrCertificate className='size-5' />
						<span className='font-bold'>{t('certificate')}</span>
					</div>
					<p className='text-muted-foreground'>{t('yes')}</p>
				</div>
				
				<div className='mt-2 flex items-center justify-between border-b pb-2'>
					<div className='flex items-center gap-2 font-space-grotesk'>
						<Infinity className='size-5' />
						<span className='font-bold'>{t('fullLifetime')}</span>
					</div>
					<p className='text-muted-foreground'>{t('yes')}</p>
				</div>
			</div>
		</>
	
	)
}

export default Description