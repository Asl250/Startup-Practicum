'use client'

import ReactStars from 'react-stars'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import useTranslate from '@/hooks/use-translate'

function ReviewCard() {
	const t = useTranslate()

	return (
		<div className='mt-6 border-t border-t-secondary'>
			<div className='mt-8 flex gap-2'>
				<Avatar>
					<AvatarImage src={'https://blog.sammi.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FKmuGvX9oRjYkG3bzttvc&w=1920&q=75'} />
					<AvatarFallback className='uppercase'>
						Chris Impley
					</AvatarFallback>
				</Avatar>

				<div className='flex flex-col'>
					<div>Chris Impley</div>
					<div className='flex items-center gap-1'>
						<ReactStars value={4.2} edit={false} color2='#DD6B20' />
						<p className='text-sm opacity-50'>
							5 minut oldin{' '}
							{t('ago')}
						</p>
					</div>
				</div>
			</div>

			<div className='mt-2'>kurs bomba</div>
		</div>
	)
}

export default ReviewCard
