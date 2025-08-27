import { Links, Meta, Outlet, Scripts } from '@remix-run/react'

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
        <h1 class='text-3xl font-bold underline'>GrowNote</h1>
        <Outlet />

        <Scripts />
      </body>
    </html>
  )
}
