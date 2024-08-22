'use client'

import Hero from '@/app/[lng]/(root)/(home)/_components/hero'
import Description from '@/app/[lng]/(root)/courses/[slug]/_components/description'
import Overview from '@/app/[lng]/(root)/courses/[slug]/_components/overview'
import CourseCard from '@/components/cards/course.card'
import TopBar from '@/components/shared/top-bar'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { courses } from '@/constants'
import useTranslate from '@/hooks/use-translate'
import type { ICourse } from '@/types'

const Page = () => {
	const t = useTranslate()
	
	return (
		<>
			<TopBar label={'allCourses'} extra={'Full Courses ReactJs'}/>
			
			<div className={'container mx-auto max-w-6xl'}>
				<div className={'grid grid-cols-3 gap-4 pt-12'}>
					<div className={'col-span-2 max-lg:col-span-3'}>
						<Hero />
						<Overview/>
					</div>
					<div className={'col-span-1 max-lg:col-span-3'}>
						<Description/>
					</div>
				</div>
				
				<Separator className={'my-12'}/>
				<h1 className='font-space-grotesk text-4xl font-bold'>
					{t('youMayLike')}
				</h1>
				<Carousel opts={{ align: 'start' }} className='mt-6 w-full'>
					<CarouselContent className='w-full'>
						{courses.map((course: ICourse) => (
							<CarouselItem
								key={course.title}
								className='md:basis-1/2 lg:basis-1/3'
							>
								<CourseCard {...course} />
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className={'flex max-lg:hidden'}/>
					<CarouselNext className={'flex max-lg:hidden'}/>
				</Carousel>
				
			</div>
		</>
	)
}
export default Page
