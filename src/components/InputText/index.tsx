import React from "react"

// Dependencies...
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import TextField from "@mui/material/TextField"

// Types...
import { IField } from "types/FormInput"

// Data...
import { INPUT_TYPE_MAP, TYPE_PARAGRAPH } from "_data/constants"

export default function InputText({
	name,
	value,
	label,
	type,
	required,
	handleChange
}: IField) {
	return (
		<div className={`form-input select${required ? " required" : ""}`} key={name}>
			<label className="label" htmlFor={name}>
				{label}
			</label>
			{type === TYPE_PARAGRAPH ? (
				<textarea
					className="native-input"
					id={name}
					name={name}
					onChange={handleChange}
				>{value}</textarea>
			) : (
				<input
					className="native-input"
					id={name}
					name={name}
					type={INPUT_TYPE_MAP[type]}
					value={value}
					onChange={handleChange}
				/>
			)}
		</div>
	)
}
