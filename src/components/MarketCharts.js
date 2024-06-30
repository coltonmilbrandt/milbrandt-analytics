"use client"
import React, { useEffect } from "react"

const MarketCharts = () => {
	useEffect(() => {
		// S&P 500
		new window.TradingView.widget({
			container_id: "sp500_chart",
			autosize: true,
			symbol: "SPY",
			interval: "D",
			timezone: "Etc/UTC",
			theme: "dark",
			style: "2",
			locale: "en",
			toolbar_bg: "#f1f3f6",
			enable_publishing: false,
			allow_symbol_change: false,
			details: false,
			hotlist: false,
			calendar: false,
			news: ["headlines"],
			studies: [],
			show_popup_button: false,
			popup_width: "1000",
			popup_height: "650",
		})

		// DJI
		new window.TradingView.widget({
			container_id: "dji_chart",
			autosize: true,
			symbol: "DJI",
			interval: "D",
			timezone: "Etc/UTC",
			theme: "dark",
			style: "2",
			locale: "en",
			toolbar_bg: "#f1f3f6",
			enable_publishing: false,
			allow_symbol_change: false,
			details: false,
			hotlist: false,
			calendar: false,
			news: ["headlines"],
			studies: [],
			show_popup_button: true,
			popup_width: "1000",
			popup_height: "650",
		})

		// Bitcoin
		new window.TradingView.widget({
			container_id: "btc_chart",
			autosize: true,
			symbol: "BITSTAMP:BTCUSD",
			interval: "D",
			timezone: "Etc/UTC",
			theme: "dark",
			style: "2",
			locale: "en",
			toolbar_bg: "#f1f3f6",
			enable_publishing: false,
			allow_symbol_change: false,
			details: false,
			hotlist: false,
			calendar: false,
			news: ["headlines"],
			studies: [],
			show_popup_button: true,
			popup_width: "1000",
			popup_height: "650",
		})

		// Ethereum
		new window.TradingView.widget({
			container_id: "eth_chart",
			autosize: true,
			symbol: "BITSTAMP:ETHUSD",
			interval: "D",
			timezone: "Etc/UTC",
			theme: "dark",
			style: "2",
			locale: "en",
			toolbar_bg: "#f1f3f6",
			enable_publishing: false,
			allow_symbol_change: false,
			details: false,
			hotlist: false,
			calendar: false,
			news: ["headlines"],
			studies: [],
			show_popup_button: true,
			popup_width: "1000",
			popup_height: "650",
		})
	}, [])

	return (
		<div className="xl:container mx-auto px-2 py-12">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
				<div className="p-0 bg-black shadow-md">
					<h3 className="text-xl font-bold mb-4">S&P 500</h3>
					<div
						id="sp500_chart"
						style={{
							height: 200,
							pointerEvents: "none",
						}}
					></div>
				</div>
				<div className="p-0 bg-black shadow-md">
					<h3 className="text-xl font-bold mb-4">DJI</h3>
					<div
						id="dji_chart"
						style={{ height: 200, pointerEvents: "none" }}
					></div>
				</div>
				<div className="p-0 bg-black shadow-md">
					<h3 className="text-xl font-bold mb-4">Bitcoin</h3>
					<div
						id="btc_chart"
						style={{ height: 200, pointerEvents: "none" }}
					></div>
				</div>
				<div className="p-0 bg-black shadow-md">
					<h3 className="text-xl font-bold mb-4">Ethereum</h3>
					<div
						id="eth_chart"
						style={{ height: 200, pointerEvents: "none" }}
					></div>
				</div>
			</div>
		</div>
	)
}

export default MarketCharts
