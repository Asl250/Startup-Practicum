import { getCourseByid } from '@/actions/course.action'
import { getSections } from '@/actions/section.action'
import Header from '@/app/[lng]/instructor/_components/header'
import Actions from '@/app/[lng]/instructor/my-courses/[courseId]/_components/actions'
import CourseFields from '@/app/[lng]/instructor/my-courses/[courseId]/_components/course-fields'
import Description from '@/app/[lng]/instructor/my-courses/[courseId]/_components/description'
import Information from '@/app/[lng]/instructor/my-courses/[courseId]/_components/information'
import PreviewImage from '@/app/[lng]/instructor/my-courses/[courseId]/_components/preview-image'
import Price from '@/app/[lng]/instructor/my-courses/[courseId]/_components/price'
import Sections from '@/app/[lng]/instructor/my-courses/[courseId]/_components/section'
import SelectFields from '@/app/[lng]/instructor/my-courses/[courseId]/_components/select-fields'
import { Separator } from '@/components/ui/separator'
import { Images, LayoutPanelLeft, Settings } from 'lucide-react'

async function Page({params} : {params: {courseId: string}}) {
	const courseJSON = await getCourseByid(params.courseId)
	const course = JSON.parse(JSON.stringify(courseJSON))
	
	const sectionsJSON = await getSections(params.courseId)
	const section = JSON.parse(JSON.stringify(sectionsJSON))
	
	
	return (
		<>
			<div className='flex items-center justify-between'>
				<Header
					title={course.title}
					description='Manage your course and see how it is performing.'
				/>
				<Actions {...course} />
			</div>
			<Separator className='my-3 bg-muted-foreground' />
			
			<div className='mt-6 grid lg:grid-cols-2 gap-4 grid-cols-1'>
				<div className='flex flex-col space-y-2'>
					<div className='flex items-center gap-2'>
						<span className='font-spaceGrotesk text-3xl font-medium'>
							Course Fields
						</span>{' '}
						<Settings />
					</div>
					<CourseFields {...course} />
					<Description {...course} />
					<Information {...course} />
					<SelectFields {...course} />
					<Price {...course} />
				</div>
				<div className='flex flex-col space-y-2'>
					{/* Sections */}
					<div className='flex items-center gap-2'>
						<span className='font-spaceGrotesk text-3xl font-medium'>
							Course Sections
						</span>{' '}
						<LayoutPanelLeft />
					</div>
					<Sections course={course} sections={section}/>
					
					{/* Preview image */}
					<div className='flex items-center gap-2'>
						<span className='font-spaceGrotesk text-3xl font-medium'>
							Preview Image
						</span>{' '}
						<Images />
					</div>
					<PreviewImage {...course} />
				</div>
			</div>
		</>
	)
}

export default Page
