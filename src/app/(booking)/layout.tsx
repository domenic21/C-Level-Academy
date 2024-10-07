export const metadata = {
  title: 'Booking Calendar',
  description: 'Calendar for booking new classes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
