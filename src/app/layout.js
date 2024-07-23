// src/app/layout.js
"use client"

import { SessionProvider } from "next-auth/react"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<title>Milbrandt Analytics</title>
				<meta
					name="description"
					content="Welcome to Milbrandt Analytics"
				/>
				<Script
					type="text/javascript"
					src="https://s3.tradingview.com/tv.js"
				/>
				<Script
					type="text/javascript"
					src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
					async
				/>
				<Script src="https://www.gstatic.com/charts/loader.js" />
			</head>
			<body className={inter.className}>
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	)
}
