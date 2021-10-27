import React from "react"

// Dependencies...
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import TextField from "@mui/material/TextField"

// Types...
import { IInputTextProps } from "types/FormInput"

// Data...
import { typeMap } from "_data/form-data"

export default function InputText({
	name,
	value,
	label,
	type,
	required,
	handleChange
}: IInputTextProps) {
	return (
		<TextField
			key={name}
			required={required}
			className={`form-input text`}
			label={label}
			{...typeMap[type]}
			value={value}
			onChange={handleChange}
			size="small"
		/>
	)
}
