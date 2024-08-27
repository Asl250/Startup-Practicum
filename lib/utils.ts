import type { ILesson } from '@/app.types'
import { enUS, ruRU, trTR } from '@clerk/localizations'
import { type ClassValue, clsx } from 'clsx'
import qs from 'query-string'
import { twMerge } from 'tailwind-merge'
import { enUS as en, uz, tr, ru } from 'date-fns/locale'


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
  toCourses?: boolean
}
export const formQuery = ({ key, params, value, toCourses = false } : UrlQueryParams) => {
  const currentUrl = qs.parse(params)
  
  currentUrl[key] = value
  return qs.stringifyUrl(
    {
      url: toCourses ? `/${window.location.pathname.split('/')[1]}/courses` : window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  )
}

interface RemoveUrlQueryParams {
  params: string
  keysToRemove: string[]
}
export const removeKeysFromQuery = ({ params, keysToRemove, }: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params)
  
  keysToRemove.forEach(key => {
    delete currentUrl[key]
  })
  
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

export const formatLessonTime = (lesson: ILesson) => {
  const duration = lesson.duration
  
  const totalSeconds =
    duration.hours * 3600 + duration.minutes * 60 + duration.seconds
  
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  
  const formattedTime = `${hours > 0 ? hours + ':' : ''}${
    minutes > 0 ? minutes + ':' : ''
  }${seconds.toString().padStart(2, '0')}`
  
  return formattedTime
}

export const getTimeLocale = (lng: string) => {
  if (lng === 'en') return en
  if (lng === 'ru') return ru
  if (lng === 'tr') return tr
  if (lng === 'uz') return uz
}

export const generateNumericId = (): string => {
  let id = ''
  for (let i = 0; i < 4; i++) {
    id += Math.floor(Math.random() * 10).toString()
  }
  return id
}
