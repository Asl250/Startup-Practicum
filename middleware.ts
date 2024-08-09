import { authMiddleware } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware';

export const intlMiddleware = createMiddleware({
	locales: ['en', 'ru', 'tr', 'uz'],
	defaultLocale: 'en'
})

export default authMiddleware({
	beforeAuth: req => intlMiddleware(req),
	publicRoutes: ['/:lng']
})


export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
};
