"use client"

import useTranslate from '@/hooks/use-translate'
import { useTranslation } from '@/i18n/client'
import { translation } from '@/i18n/server'
import { useParams } from 'next/navigation'

const Home =  () => {
	const t = useTranslate()
	
	return (
		<div>
			<h1 className={'font-spaceGrotesk pt-24'}>
				{t('home')}
			</h1>
		</div>
	)
}
export default Home
