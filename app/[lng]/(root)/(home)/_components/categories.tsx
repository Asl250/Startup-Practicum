'use client'

import CategoryCard from '@/components/cards/category.card'
import { categories } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const Categories = () => {
	const t = useTranslate()
	const { lng } = useParams()
	
	return (
		<div className='container mx-auto max-w-6xl py-12'>
			<div className='flex flex-col space-y-1'>
				<h1 className='font-spaceGrotesk text-3xl font-bold'>
					{t('topCategories')}
				</h1>
				<p className='text-sm text-muted-foreground'>
					{t('topCategoriesDescription')}
				</p>
			</div>
			
			<div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
				{categories.map(category => (
					<Link href={`/${lng}/courses?q=${category.label}`}  key={category.label}>
						<CategoryCard {...category} />
					</Link>
				))}
			</div>
		</div>
	)
}
export default Categories
