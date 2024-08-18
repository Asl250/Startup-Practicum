'use client'

import { deleteCourse, updateStatusCourse } from '@/actions/course.action'
import type { ICourse } from '@/app.types'
import ConfirmDeleteModal from '@/components/modals/confirm-delete-modal'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { toast, Toaster } from 'sonner'

const Actions = (course: ICourse) => {
	const pathname = usePathname()
	const router = useRouter()
	
	const onUpdateCourse = () => {
		let promise
		
		if (course.published) {
			promise = updateStatusCourse(course._id, false, pathname)
		} else {
			promise = updateStatusCourse(course._id, true, pathname)
		}
		
		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully updated!',
			error: 'Something went wrong!',
		})
		
	}
	
	const onDelete = () => {
		const promise = deleteCourse(course._id, '/en/instructor/my-courses')
			.then(() => router.push('/en/instructor/my-courses'))
		
		toast.promise(promise, {
			loading: 'Loading...',
			success: 'Successfully deleted!',
			error: 'Something went wrong!',
		})
	}
	
	return (
		<>
			<Toaster theme={'dark'} position={'top-center'} richColors/>
			<div className={'flex gap-2 self-end'}>
				
				<Button onClick={onUpdateCourse}>{course.published ? 'Draft' : 'Publish'}</Button>
				<ConfirmDeleteModal onConfirm={onDelete}>
					<Button variant={'destructive'}>Delete</Button>
				</ConfirmDeleteModal>
			
			</div></>
		
	)
}
export default Actions
