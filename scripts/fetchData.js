const yahooFinance = require("yahoo-finance2").default
const fs = require("fs")
const path = require("path")

async function fetchData() {
	try {
		const data = await yahooFinance.historical("AAPL", {
			period1: "2023-01-01",
			period2: "2023-12-31",
			interval: "1d", // Adjust interval as needed
		})
		const filePath = path.join(__dirname, "../public/data.json")
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
		console.log("Data fetched and saved to public/data.json")
	} catch (error) {
		console.error("Error fetching data:", error)
	}
}

fetchData()
