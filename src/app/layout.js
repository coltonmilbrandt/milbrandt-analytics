// src/app/layout.js
"use client"

import { SessionProvider } from "next-auth/react"
import { Inter } from "next/font/google"
import "./globals.css"

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
				<script
					type="text/javascript"
					src="https://s3.tradingview.com/tv.js"
				></script>
				<script
					type="text/javascript"
					src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
					async
				></script>
				<script src="https://www.gstatic.com/charts/loader.js"></script>
			</head>
			<body className={inter.className}>
				<SessionProvider>{children}</SessionProvider>
			</body>
		</html>
	)
}
