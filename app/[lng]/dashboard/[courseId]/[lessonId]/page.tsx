import { getLesson } from '@/actions/lesson.action'
import VideoLesson from '@/app/[lng]/dashboard/[courseId]/[lessonId]/_components/video-lesson'
import { translation } from '@/i18n/server'
import parse from 'html-react-parser'

interface Props {
	params: { lessonId: string; lng: string }
}

async function Page({ params: { lessonId, lng } }: Props) {
	const {t} = await translation(lng)

	const lesson = await getLesson(lessonId)
	
	return (
		<div>
			<VideoLesson lesson={JSON.parse(JSON.stringify(lesson))}/>
			{lesson.content && (
				<div className='rounded-md bg-gradient-to-b from-background to-secondary  pb-4 pt-1 md:px-6'>
					<h1 className='mb-2 font-space-grotesk text-xl font-medium text-primary'>
						{t('usefullInformation')}
					</h1>
					<div className='prose max-w-none flex-1 dark:prose-invert'>
						{parse(lesson.content)}
					</div>
				</div>
			)}
		</div>
	)
}

export default Page
