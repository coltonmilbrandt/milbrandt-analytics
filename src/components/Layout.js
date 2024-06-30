// src/app/layout.js
"use client"

import { SessionProvider } from "next-auth/react"
import "../app/globals.css"
import Navbar from "./Navbar"

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<SessionProvider>
					<Navbar />
					{children}
				</SessionProvider>
			</body>
		</html>
	)
}
