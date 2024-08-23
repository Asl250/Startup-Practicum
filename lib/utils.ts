import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { enUS, ruRU, trTR } from '@clerk/localizations'
import qs from 'query-string'

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
