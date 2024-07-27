import React from "react"

const Dropdown = ({ options, value, onChange, className }) => {
	return (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className={`border border-gray-300 rounded p-2 ${className}`}
		>
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	)
}

export default Dropdown
