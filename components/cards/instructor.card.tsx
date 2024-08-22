'use client'

import type { IInstructor } from '@/types'
import Image from 'next/image'

const InstructorCard = (instructor : IInstructor) => {
	return (
		<div className={'flex flex-col space-y-1'}>
			<div className={'relative h-72 w-full'}>
				<Image
					fill
					className={'object-cover rounded-md'}
					src={instructor.image}
					alt={instructor.name}/>
			</div>
			<h1 className={'font-spaceGrotesk text-2xl font-bold'}>
				{instructor.name}
			</h1>
			<h3 className={'font-medium text-muted-foreground'}>{instructor.job}</h3>
		</div>
	)
}
export default InstructorCard
