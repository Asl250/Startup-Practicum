import type { ILesson } from '@/app.types'
import { enUS, ruRU, trTR } from '@clerk/localizations'
import { type ClassValue, clsx } from 'clsx'
import qs from 'query-string'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function localization (lng : string) {
  if (lng === 'en') return enUS
  if (lng === 'ru') return ruRU
  if (lng === 'tr') return trTR
  if (lng === 'uz') return ruRU
}

interface UrlQueryParams {
  params: string
  key: string
  value: string | null
}
export const formQuery = ({ key, params, value } : UrlQueryParams) => {
  const currentUrl = qs.parse(params)
  
  currentUrl[key] = value
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

export const calculateTotalDuration = (lessons: ILesson[]) => {
  let totalMinutes = 0
  
  lessons.forEach(lesson => {
    totalMinutes +=
      lesson.duration.hours * 60 +
      lesson.duration.minutes +
      Math.round(lesson.duration.seconds / 60)
  })
  
  const totalHours = Math.floor(totalMinutes / 60)
  const totalMinutesLeft = totalMinutes % 60

  return `${totalHours}.${totalMinutesLeft
    .toString()
    .padStart(2, '0')
  }`
}
