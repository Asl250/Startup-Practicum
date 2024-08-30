import { ICourse } from '@/app.types'
import CustomImage from '@/components/shared/custom-image'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

const CourseCard = (course : ICourse) => {
	return (
		<Link href={`/course/${course._id}`}>
			<Card className={'group w-full'}>
				<CardContent className={'relative w-full h-56'}>
					<CustomImage
						src={course.previewImage}
						alt={course.title}/>
				</CardContent>
				<div className={'my-4 flex flex-col space-y-2 px-2'}>
					<h2 className={'line-clamp-1 font-spaceGrotesk text-2xl font-bold'}>
						{course.title}
					</h2>
					<Separator/>
					<div className={'flex items-center justify-between'}>
						<div className={'flex items-center gap-2'}>
							<div className={'size-[40px] relative'}>
								<CustomImage
									src={course.instructor.picture}
									alt={course.title}
									className={'rounded-full'}
								/>
							</div>
							
							<p className={'text-sm text-muted-foreground'}>
								{course.instructor.fullName}
							</p>
						</div>
						<div className={'flex gap-2'}>
							<div className={'font-spaceGrotesk self-start text-sm text-muted-foreground line-through'}>
								{course.oldPrice.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</div>
							<div className={'font-spaceGrotesk self-start text-md'}>
								{course.currentPrice.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</div>
						</div>
					</div>
				</div>
			</Card>
		</Link>
	)
}
export default CourseCard
