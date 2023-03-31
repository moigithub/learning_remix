import { Outlet } from '@remix-run/react'
import styles from '~/styles/root.css'
import { MainHeader } from '~/components/navigation/MainHeader'
import type { LoaderArgs } from '@remix-run/node'
import { getUserFromSession } from '~/data/auth.server'

export default function RootLayoutGroup() {
  return (
    <>
      Root layout (group)
      <MainHeader />
      <Outlet />
    </>
  )
}

export function loader({ request }: LoaderArgs) {
  return getUserFromSession(request)
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}
