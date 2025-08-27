import { Links, Meta, Outlet, Scripts } from '@remix-run/react'
import { Button } from 'flowbite-react'

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
        <h1 class='text-3xl font-bold underline'>Hello TypeScript!</h1>
        <Button>Click me</Button>
        <Outlet />

        <Scripts />
      </body>
    </html>
  )
}
