import React, { useEffect, useRef } from "react"

const TradingViewWidget = ({ symbol, containerId }) => {
	const widgetRef = useRef(null)
	const scriptAdded = useRef(false)

	useEffect(() => {
		if (!scriptAdded.current) {
			const script = document.createElement("script")
			script.src =
				"https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
			script.async = true
			script.innerHTML = JSON.stringify({
				symbol: symbol,
				width: "100%",
				height: "100%",
				locale: "en",
				dateRange: "1D",
				colorTheme: "dark",
				isTransparent: false,
				autosize: true,
				largeChartUrl: "",
			})
			widgetRef.current.appendChild(script)
			scriptAdded.current = true // Mark the script as added
		}
	}, [symbol])

	return (
		<div
			className="tradingview-widget-container"
			id={containerId}
			ref={widgetRef}
			style={{ position: "relative" }}
		>
			<div className="tradingview-widget-container__widget"></div>
			<div
				className="tradingview-widget-copyright"
				style={{
					position: "absolute",
					bottom: 0,
					left: 0,
					fontSize: "0.5em",
					color: "#000",
					opacity: 0.1,
				}}
			>
				<a
					href="https://www.tradingview.com/"
					rel="noopener nofollow"
					target="_blank"
					style={{ color: "#000", textDecoration: "none" }}
				>
					<span className="blue-text">
						Track all markets on TradingView
					</span>
				</a>
			</div>
		</div>
	)
}

export default TradingViewWidget
