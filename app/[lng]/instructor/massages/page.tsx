import { getMassage } from '@/actions/massage.action'
import Header from '@/app/[lng]/instructor/_components/header'
import MassageCard from '@/components/cards/massage.card'
import { Separator } from '@/components/ui/separator'
import { SearchParamsProps } from '@/app.types'
import Pagination from '@/components/shared/pagination'
import { auth } from '@clerk/nextjs/server'

async function Page({ searchParams }: SearchParamsProps) {
	const { userId } = auth()
	
	const page = searchParams.page ? +searchParams.page : 1
	const result = await getMassage({ clerkId: userId!, page, pageSize: 6 })
	
	return (
		<>
			<Header
				title='Massages'
				description='Here you can see all the massages of your courses'
			/>
			
			<div className='mt-4 rounded-md bg-background p-4'>
				<h3 className='font-spaceGrotesk text-lg font-medium'>All Reviews</h3>
				<Separator className='my-3' />
				
				<div className='flex flex-col space-y-3'>
					{result.massage.map(massage => (
						<MassageCard
							key={massage._id}
							massage={JSON.parse(JSON.stringify(massage))}
						/>
					))}
				</div>
				
				<div className='mt-6'>
					<Pagination isNext={result.isNext} pageNumber={page} />
				</div>
			</div>
		</>
	)
}

export default Page
