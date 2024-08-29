import { getInstructors } from '@/actions/user.action'
import Item from '@/app/[lng]/admin/instructors/_components/item'
import Header from '@/app/[lng]/instructor/_components/header'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

const Page = async () => {
	const instructors = await getInstructors()
	return (
		<>
			<Header
				title='Instructors'
				description='Approve or disapprove them. You can also give them the admin role.'
			/>
			
			<Table className='mt-4 bg-background'>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[100px]'>Role</TableHead>
						<TableHead className='w-[100px]'>Email</TableHead>
						<TableHead className='w-[100px]'>Portfolio</TableHead>
						<TableHead className='w-[100px]'>YouTube</TableHead>
						<TableHead className='w-[100px]'>Github</TableHead>
						<TableHead>Job</TableHead>
						<TableHead className='text-right'>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{instructors.map(instructor => (
						<Item
							key={instructor._id}
							item={JSON.parse(JSON.stringify(instructor))}
						/>
					))}
				</TableBody>
			</Table>
		</>
	)
}
export default Page
