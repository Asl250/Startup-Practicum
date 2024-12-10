"use client"

import type { ICourse } from '@/app.types'
import CourseCard from '@/components/cards/course.card'
import NoResult from '@/components/shared/no-result'
import Pagination from '@/components/shared/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { courseLanguage, filterCourses, filterLevels } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import { formQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
	result: {
		courses: ICourse[]
		isNext: boolean
		totalCourses: number
	}
}

const AllCourses = ({result}: Props) => {
	const t = useTranslate()
	const router = useRouter()
	
	const searchParams = useSearchParams()
	const page = searchParams.get('page')
	
	const {totalCourses, isNext, courses} = result
	
	const onUpdateParams = (value: string) => {
		const newUrl = formQuery({
			value,
			key: 'filter',
			params: searchParams.toString(),
		})
		
		router.push(newUrl)
	}
	
	return (
		<div className='container mx-auto mt-12 max-w-6xl'>
			<div className='flex items-center justify-between max-md:flex-col max-md:items-start max-md:space-y-2'>
				<h2 className='max-md:self-end max-md:hidden'>
					{t('result1')}{' '}
					<span className='font-spaceGrotesk font-bold'>{totalCourses}</span>{' '}
					{t('result2')}
				</h2>
				
				<div className='flex items-center gap-2'>
					<p className={'max-sm:hidden'}>{t('sortBy')}</p>
					
					<Select onValueChange={onUpdateParams}>
						<SelectTrigger className='w-[120px] bg-gradient-to-r from-secondary to-background'>
							<SelectValue placeholder={t('filter')} />
						</SelectTrigger>
						<SelectContent>
							{filterCourses.map(item => (
								<SelectItem key={item.name} value={item.name}>
									{t(item.label)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					
					<Select onValueChange={onUpdateParams}>
						<SelectTrigger className='w-[120px] bg-gradient-to-l from-background via-secondary to-background'>
							<SelectValue placeholder={t('level')} />
						</SelectTrigger>
						<SelectContent>
							{filterLevels.map(item => (
								<SelectItem key={item.name} value={item.name}>
									{t(item.label)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					
					<Select onValueChange={onUpdateParams}>
						<SelectTrigger className='w-[120px] bg-gradient-to-l from-secondary to-background'>
							<SelectValue placeholder={t('language')} />
						</SelectTrigger>
						<SelectContent>
							{courseLanguage.map(item => (
								<SelectItem key={item} value={item} className='capitalize'>
									{item}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			
			<div className='mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
				{courses.map((course, index) => (
					<CourseCard key={index} {...course} />
				))}
			</div>
			
			{courses.length === 0 && (
				<NoResult
					title={t('noCourses')}
					description={t('noCourseDescription')}
				/>
			)}
			
			<div className='mt-10'>
				<Pagination pageNumber={page ? +page : 1} isNext={isNext} />
			</div>
		</div>
	)
}
export default AllCourses
