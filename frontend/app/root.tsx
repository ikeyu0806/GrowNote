import { Links, Meta, Outlet, Scripts } from '@remix-run/react'
import { Header } from './components/layout/Header.tsx'

export default function App() {
  return (
    <html lang='ja'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
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
