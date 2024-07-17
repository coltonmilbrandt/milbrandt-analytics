const yahooFinance = require("yahoo-finance2").default
const fs = require("fs")
const path = require("path")

async function fetchData() {
	try {
		console.log("Fetching data...")
		const data = await yahooFinance.historical("BTC-USD", {
			period1: "2024-01-01",
			period2: "2024-07-15",
			interval: "1d", // Adjust interval as needed
		})

		if (!data || data.length === 0) {
			throw new Error("No data returned from Yahoo Finance API")
		}

		const filePath = path.join(__dirname, "../public/data.json")
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
		console.log("Data fetched and saved to public/data.json")
	} catch (error) {
		console.error("Error fetching data:", error)
	}
}

fetchData()
