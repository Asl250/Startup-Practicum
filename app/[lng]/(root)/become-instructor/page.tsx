import { getRole } from '@/actions/user.action'
import TopBar from '@/components/shared/top-bar'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import InstructorForm from './_components/instructor-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Praktikum | Muallim boʻlish',
	description:
		'Praktikum platformasida muallim boʻlish uchun ariza qoldiring. Oʻzingizga mos kursni tuzing va oʻrganishni boshlang!',
}
async function Page() {
	const {userId} = auth()
	const user = await getRole(userId!)
	
	if (user.role === 'instructor') redirect('/')
	
	return (
		<>
			<TopBar
				label='becomeInstructor'
				description='becomeInstructorDescription'
			/>

			<div className='container mx-auto mt-12 min-h-[50vh] max-w-6xl'>
				<div className='lg:grid lg:grid-cols-2 lg:gap-2'>
					<InstructorForm />

					<Image
						src={'/assets/instructor.png'}
						alt='Instructor'
						width={430}
						height={430}
						className='self-end justify-self-end hidden lg:flex'
					/>
				</div>
			</div>
		</>
	)
}

export default Page
