'use client'

import useTranslate from '@/hooks/use-translate'
import { Clock3 } from 'lucide-react'
import Image from 'next/image'
import { PiStudentBold } from 'react-icons/pi'
import ReactStars from 'react-stars'

const Hero = () => {
	const t = useTranslate()
	return (
		<>
			<h1 className='font-space-grotesk text-4xl font-bold'>React full Course</h1>
			<p className='mt-4 text-muted-foreground'>Mauris accumsan nisi quis finibus posuere. Quisque commodo porttitor elit, ut sollicitudin eros vulputate nec</p>
			
			<div className='mt-4 flex flex-wrap items-center gap-6'>
				<div className='flex items-center gap-2'>
					<Image
						className='rounded-full'
						width={50}
						height={50}
						alt={'author'}
						src={'https://blog.sammi.app/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2FKmuGvX9oRjYkG3bzttvc&w=1920&q=75'}
					/>
					<p className='font-space-grotesk font-bold'>
						Chris Impley
					</p>
				</div>
				<div className={'flex items-center gap-2'}>
					<p className='font-bold text-[#E59819]'>4.5</p>
					<ReactStars value={4.5} edit={false} color2={'#E59819'} />
					<p className='font-bold'>(199)</p>
				</div>
				
				<div className='flex items-center gap-2'>
					<PiStudentBold className='size-6' />
					<p className='font-spaceGrotesk font-bold'>
						80 {t('students')}
					</p>
				</div>
				
				<div className='flex items-center gap-2'>
					<Clock3 className='size-6' />
					<p className='font-spaceGrotesk font-bold'>
						{t('lastUpdated')} 11/2023
					</p>
				</div>
			</div>
			
			<Image
				src={'https://sammi.ac/_next/image?url=https%3A%2F%2Futfs.io%2Ff%2Fa8573b7c-95b2-4459-8414-8eacde874b0a-kilwdl.png&w=1920&q=75'}
				alt={'reactjs'}
				width={1920}
				height={1080}
				className={'mt-4 rounded-md object-cover'}
			/>
		</>
	)
}
export default Hero
