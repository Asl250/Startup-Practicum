'use client'

import { Button } from '@/components/ui/button'
import IconCloud from '@/components/ui/icon-cloud'
import { VelocityScroll } from '@/components/ui/scroll-based-velocity'
import useTranslate from '@/hooks/use-translate'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'

const slugs = [
	"typescript",
	"javascript",
	"dart",
	"java",
	"react",
	"flutter",
	"android",
	"html5",
	"css3",
	"nodedotjs",
	"express",
	"nextdotjs",
	"prisma",
	"amazonaws",
	"postgresql",
	"firebase",
	"nginx",
	"vercel",
	"testinglibrary",
	"jest",
	"cypress",
	"docker",
	"git",
	"jira",
	"github",
	"gitlab",
	"visualstudiocode",
	"androidstudio",
	"sonarqube",
	"figma",
];

function Hero() {
	const t = useTranslate()
	const [loading, setLoading] = useState(true)

	return (
		<>
			<div
				className='pt-8 container mx-auto grid xl:min-h-[75vh] min-h-[50vh] max-w-5xl grid-cols-2 md:gap-8 max-md:grid-cols-1 max-md:pt-32'>
				<div className='flex flex-col space-y-4 self-center max-lg:mt-16'>
					<h1 className='font-spaceGrotesk text-5xl font-bold'>
						{t('heroTitle')}{' '}
						<span className='text-blue-500'>{t('heroTitleSpan')}</span>
					</h1>
					<p className='text-muted-foreground'>{t('heroDescription')}</p>
					<div className='flex gap-4'>
						<Link href={'/courses'}>
							<Button variant={'outline'} size={'lg'} rounded={'full'}>
								{t('findCourses')}
							</Button>
						</Link>
						<Link href={'/courses'}>
							<Button size={'lg'} rounded={'full'}>
								{t('blogs')}
							</Button>
						</Link>
					</div>
				</div>
				
				<div
					onLoad={() => setLoading(false)}
					className={cn('relative flex size-full items-center justify-center overflow-hidden rounded-lg lg:ps-5',
						loading && 'scale-110 blur-3xl grayscale',
					)}>
					<IconCloud iconSlugs={slugs} />
				</div>
			</div>
			
			<div className='w-full'>
				<VelocityScroll
					text="Velocity Scroll"
					default_velocity={1.5}
					className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
				/>
			</div>
		</>
	)
}

export default Hero
