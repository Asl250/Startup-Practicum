"use client"

import { Button } from '@/components/ui/button'
import { formQuery } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
	pageNumber: number
	isNext: boolean
}

const Pagination = ({isNext, pageNumber} : Props) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	
	if (!isNext && pageNumber === 1) return null
	
	const onNavigate = (direction: 'prev' | 'next') => {
		const nextPageNumber = direction === 'prev' ? pageNumber - 1 : pageNumber + 1
		
		const newUrl = formQuery({
			params: searchParams.toString(),
			key: 'page',
			value: nextPageNumber.toString()
		})
		
		router.push(newUrl)
	}
	
	return (
		<div className='flex w-full items-center justify-center gap-2'>
			<Button
				onClick={() => onNavigate('prev')}
				disabled={pageNumber === 1}
				className='flex min-h-[36px] items-center justify-center gap-2 border'
			>
				Prev
			</Button>
			<div className='flex items-center justify-center rounded-md px-3.5 py-2 font-spaceGrotesk'>
				{pageNumber}
			</div>
			<Button
				onClick={() => onNavigate('next')}
				disabled={!isNext}
				className='flex min-h-[36px] items-center justify-center gap-2 border'
			>
				Next
			</Button>
		</div>
	)
}
export default Pagination
