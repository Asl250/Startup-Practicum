import { Button } from '@/components/ui/button'
import { formQuery, removeKeysFromQuery } from '@/lib/utils'
import { Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent } from 'react'
import { debounce } from 'lodash'


const GlobalSearch = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	
	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		const text = e.target.value.toLowerCase()
		const isCoursePage = pathname.split('/').includes('courses')
		
		if (text && text.length > 2) {
			const newUrl = formQuery({
				params: searchParams.toString(),
				key: 'q',
				value: text,
				toCourses: !isCoursePage,
			})
			router.push(newUrl)
		} else {
			const newUrl = removeKeysFromQuery({
				params: searchParams.toString(),
				keysToRemove: ['q'],
			})
			router.push(newUrl)
		}
	}
	
	const debounceSearch = debounce(handleSearch, 300)
	
	
	return (
		<div className='search-box max-md:pb-4'>
			<Button
				size={'icon'}
				variant={'ghost'}
				className='btn-search'
				aria-label='search-btn'
			>
				<Search />
			</Button>
			<input
				type='text'
				className='input-search'
				placeholder='Type to Search...'
				onChange={debounceSearch}
			/>
		</div>
	)
}
export default GlobalSearch
