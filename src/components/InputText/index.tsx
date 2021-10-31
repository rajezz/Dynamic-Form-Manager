import React from "react"

// Dependencies...
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import TextField from "@mui/material/TextField"

// Types...
import { IField } from "types/FormInput"

// Data...
import { typeMap } from "_data/form-data"

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
			<input
				className="native-input"
				id={name}
				name={name}
				type="text"
				value={value}
				onChange={handleChange}
			/>
		</div>
	)
}
