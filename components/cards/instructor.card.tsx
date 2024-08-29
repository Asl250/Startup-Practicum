'use client'

import type { IUser } from '@/app.types'
import Image from 'next/image'

interface Props {
	instructor: IUser
}

const InstructorCard = ({ instructor }: Props) => {
	return (
		<div className={'flex flex-col space-y-1'}>
			<div className={'relative h-72 w-full'}>
				<Image
					fill
					className={'object-cover rounded-md'}
					src={instructor.picture}
					alt={instructor.fullName}/>
			</div>
			<h1 className={'font-spaceGrotesk text-2xl font-bold'}>
				{instructor.fullName}
			</h1>
			<h3 className={'font-medium text-muted-foreground'}>{instructor.job}</h3>
		</div>
	)
}
export default InstructorCard
