import { getCourseByid } from '@/actions/course.action'
import Header from '@/app/[lng]/instructor/_components/header'
import Actions from '@/app/[lng]/instructor/my-courses/[courseId]/_components/actions'
import CourseFields from '@/app/[lng]/instructor/my-courses/[courseId]/_components/course-fields'
import { Separator } from '@/components/ui/separator'
import { Settings } from 'lucide-react'

async function Page({params} : {params: {courseId: string}}) {
	const courseJSON = await getCourseByid(params.courseId)
	const course = JSON.parse(JSON.stringify(courseJSON))
	
	return (
		<>
			<div className='flex items-center justify-between'>
				<Header
					title={course.title}
					description='Manage your course and see how it is performing.'
				/>
				<Actions {...course} />
			</div>
			
			<Separator className={'my-5 bg-muted-foreground'}/>
			
			<div className={'mt-6 grid grid-cols-2 gap-4'}>
				<div className={'flex flex-col space-y-2'}>
					<div className='flex items-center gap-2'>
						<span className='font-space-grotesk text-3xl font-medium'>
							Course Fields
						</span>{' '}
						<Settings />
					</div>
					<CourseFields/>
				</div>
				<div className={'flex flex-col space-y-2'}></div>
			
			</div>
		</>
	
	)
}

export default Page
