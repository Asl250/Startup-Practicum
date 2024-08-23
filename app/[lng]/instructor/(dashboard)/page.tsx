import { getCourses } from '@/actions/course.action'
import Header from '@/app/[lng]/instructor/_components/header'
import InstructorCourseCard from '@/components/cards/instructor-course.card'
import ReviewCard from '@/components/cards/review.card'
import StatisticsCard from '@/components/cards/statistics.card'
import { auth } from '@clerk/nextjs/server'
import { MonitorPlay } from 'lucide-react'
import { GrMoney } from 'react-icons/gr'
import { PiStudent } from 'react-icons/pi'


const Page = async () => {
	const {userId} = auth()
	const result = await getCourses({ clerkId: userId! })
	
	return (
		<div>
			<Header title={'Dashboard'} description={'Welcome to Dashboard'}/>
		
			<div className={'mt-4 grid grid-cols-3 gap-4'}>
				<StatisticsCard label={'Total Courses'} value={result.totalCourses.toString()} Icon={MonitorPlay}/>
				<StatisticsCard label={'Total Students'} value={'11.000'} Icon={PiStudent}/>
				<StatisticsCard label={'Total Sales'} value={'$190.00'} Icon={GrMoney}/>
			</div>
			
			<Header title={'Latest Courses'} description={'Here are your latest courses'}/>
			<div className={'nt-4 grid grid-cols-3 gap-4'}>
				{result.courses.map(course => (
					<InstructorCourseCard key={course.title} course={course}/>
				))}
			</div>
			
			<Header title={'Reviews'} description={'Here are your latest reviews'}/>
			<div className={'mt-4 grid grid-cols-3 gap-4'}>
				<div className={'rounded-md bg-background px-4 pb-4'}>
					<ReviewCard />
				</div>
				<div className={'rounded-md bg-background px-4 pb-4'}>
					<ReviewCard />
				</div>
				<div className={'rounded-md bg-background px-4 pb-4'}>
					<ReviewCard />
				</div>
			</div>
		</div>
	)
}
export default Page
