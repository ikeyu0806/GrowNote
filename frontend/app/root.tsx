import { Links, Meta, Outlet, Scripts } from '@remix-run/react'
import { Header } from './components/layout/Header.tsx'

export default function App() {
  return (
    <html>
      <head>
        <link rel='icon' href='data:image/x-icon;base64,AA' />
        <link href='/app/tailwind.css' rel='stylesheet'></link>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />

        <Scripts />
      </body>
    </html>
  )
}
