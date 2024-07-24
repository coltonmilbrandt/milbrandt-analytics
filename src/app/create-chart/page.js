// src/pages/create-chart.js
"use client"

import Layout from "../../components/Layout"
import CreateChart from "../../components/CreateChart"

const CreateChartPage = () => {
	return (
		<Layout>
			<div className="flex items-center justify-center h-screen">
				<CreateChart />
			</div>
		</Layout>
	)
}

export default CreateChartPage
