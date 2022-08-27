import { lazy, Suspense, Fragment } from 'react'
import { Route } from 'wouter'

export const HOME_ROUTE = '/'
export const GROUP_PAGE_ROUTE = '/group'
export const CEREMONY_PAGE_ROUTE = '/ceremony'

export function Routes() {
	return (
		<Fragment>
			<Route path={HOME_ROUTE} component={renderHomePage} />
			<Route path={`${GROUP_PAGE_ROUTE}/:id?`} component={renderGroupPage} />
			<Route path={`${CEREMONY_PAGE_ROUTE}/:id?`} component={renderCeremonyPage} />
		</Fragment>
	)
}

const renderHomePage = () => {
	const HomePage = lazy(() => import('pages/Home'))
	return (
		<Suspense fallback={<></>}>
			<HomePage />
		</Suspense>
	)
}

const renderGroupPage = () => {
	const GroupPage = lazy(() => import('pages/GroupPage'))
	return (
		<Suspense fallback={<></>}>
			<GroupPage />
		</Suspense>
	)
}

const renderCeremonyPage = () => {
	const CeremonyPage = lazy(() => import('pages/CeremonyPage'))
	return (
		<Suspense fallback={<></>}>
			<CeremonyPage />
		</Suspense>
	)
}
