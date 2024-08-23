'use client'

import type { ISection } from '@/app.types'
import LessonList from '@/app/[lng]/(root)/courses/[slug]/_components/lesson-list'
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import useTranslate from '@/hooks/use-translate'
import { calculateTotalDuration } from '@/lib/utils'
import { ChevronsUpDown, Dot } from 'lucide-react'

const SectionList = (section : ISection) => {
	const t = useTranslate()
	
	return (
		<AccordionItem value={section.title} className='mt-1 border-none'>
			<AccordionTrigger
				className='accordion-course flex w-full items-center justify-between bg-primary p-4 hover:no-underline'>
				<div className='flex items-center gap-2'>
					<ChevronsUpDown strokeWidth={1.75} className='size-4' />
					<div className='text-left font-space-grotesk text-[14px] font-semibold'>
						{section.title}
					</div>
				</div>
				<div className='hidden items-center text-sm lg:flex'>
					<div>
						{section.lessons.length} {t('lessons')}
					</div>
					<Dot />
					<div>
						{calculateTotalDuration(section.lessons)} {t('hours')}
					</div>
				</div>
			</AccordionTrigger>
			<AccordionContent>
				<div className='mt-2 border-l-2 border-l-gray-800 p-4'>
					{section.lessons.map(lesson => (
						<LessonList key={lesson._id} {...lesson} />
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	
	)
}
export default SectionList
