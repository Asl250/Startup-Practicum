'use client'

import type { ICategory } from '@/types'
import Image from 'next/image'

const CategoryCard = (category : ICategory) => {
	return (
		<div>
			<div className={'flex h-44 w-full items-center justify-center rounded-md bg-secondary'}>
				<Image
					width={100}
					height={100}
					src={category.icon}
				  alt={category.label}/>
			</div>
			<h2 className={'font-spaceGrotesk text-lg line-clamp-1 mt-2'}>
				{category.label}
			</h2>
		</div>
	)
}
export default CategoryCard
