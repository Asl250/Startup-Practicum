import { getDetailedCourse, getFeaturedCourses, getIsPurchase } from '@/actions/course.action'
import type { ICourse } from '@/app.types'
import Description from '@/app/[lng]/(root)/course/[slug]/_components/description'
import Hero from '@/app/[lng]/(root)/course/[slug]/_components/hero'
import Overview from '@/app/[lng]/(root)/course/[slug]/_components/overview'
import CourseCard from '@/components/cards/course.card'
import TopBar from '@/components/shared/top-bar'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Separator } from '@/components/ui/separator'
import { translation } from '@/i18n/server'
import { auth } from '@clerk/nextjs/server'
import type { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
	{ params }: { params: { slug: string } },
	parent: ResolvingMetadata
): Promise<Metadata> {
	const course = await getDetailedCourse(params.slug!)
	
	return {
		title: course.title,
		description: course.description,
		openGraph: {
			images: course.previewImage,
			title: course.title,
			description: course.description,
		},
		keywords: course.tags,
	}
}

interface Props {
	params: { lng: string; slug: string }
}

const Page = async ({params: {lng, slug}} : Props) => {
	const { t } = await translation(lng)
	const {userId} = auth()

	const courseJSON = await getDetailedCourse(slug)
	const course = JSON.parse(JSON.stringify(courseJSON))
	
	const coursesJSON = await getFeaturedCourses()
	const courses = JSON.parse(JSON.stringify(coursesJSON))

	
	let isPurchased
	if (userId) {
		isPurchased = await getIsPurchase(userId!, slug)
	}
	
	return (
		<>
			<TopBar label={'allCourses'} extra={'Full Courses ReactJs'}/>
			
			<div className={'container mx-auto max-w-6xl'}>
				<div className={'grid grid-cols-3 gap-4 pt-12'}>
					<div className={'col-span-2 max-lg:col-span-3'}>
						<Hero {...course} />
						<Overview {...course}/>
					</div>
					<div className={'col-span-1 max-lg:col-span-3'}>
						<Description course={course} isPurchased={!!isPurchased}/>
					</div>
				</div>
				
				<Separator className={'my-12'}/>
				<h1 className='font-spaceGrotesk text-4xl font-bold'>
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
