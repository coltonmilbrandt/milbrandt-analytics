import React from "react"
import TradingViewWidget from "./TradingViewWidget"

const MarketCharts = () => {
	return (
		<div className="xl:container mx-auto px-2">
			<div className="grid h-52 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
				<div className="p-0 bg-black shadow-md">
					<TradingViewWidget
						symbol="AMEX:SPY"
						containerId="sp500_chart"
					/>
				</div>
				<div className="p-0 bg-black shadow-md">
					<TradingViewWidget symbol="DJI" containerId="dji_chart" />
				</div>
				<div className="p-0 bg-black shadow-md">
					<TradingViewWidget
						symbol="BITSTAMP:BTCUSD"
						containerId="btc_chart"
					/>
				</div>
				<div className="p-0 bg-black shadow-md">
					<TradingViewWidget
						symbol="BITSTAMP:ETHUSD"
						containerId="eth_chart"
					/>
				</div>
			</div>
		</div>
	)
}

export default MarketCharts
