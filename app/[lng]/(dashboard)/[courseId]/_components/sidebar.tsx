import { getDashboardCourse } from '@/actions/course.action'
import { Progress } from '@/components/ui/progress'
import { translation } from '@/i18n/server'
import { auth } from '@clerk/nextjs/server'

interface Props {
	lessonId: string
	lng: string
}

const Sidebar = async ({ lessonId, lng }: Props) => {
	const { t } = await translation(lng)
	const {userId} = auth()
	console.log(lessonId)
	// const result = await getDashboardCourse(userId!, lessonId)
	// console.log(result)
	
		return (
		<div className='custom-scrollbar sticky inset-y-0 left-0 z-50 hidden h-screen w-80 overflow-y-scroll border-r bg-gray-200 dark:bg-gray-900 lg:block'>
			<div className='flex flex-col space-y-2 p-2'>
				<h1 className='line-clamp-1 text-xl font-medium'>Title</h1>
				<Progress value={33} className={'h-4'}/>
				<p className={'text-sm'}>33% {t('complete')}</p>
			</div>
			
			<div className={'mt-4'}>
				{/* <Sections/> */}
			</div>
		</div>
	)
}
export default Sidebar
