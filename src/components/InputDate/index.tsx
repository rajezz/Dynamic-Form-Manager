import React from "react"

// Dependencies...
import TextField from "@mui/material/TextField"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DesktopDatePicker from "@mui/lab/DesktopDatePicker"

// Types...
import { IField } from "types/FormInput"

// Data...

export default function InputDate({ name, value, label, required, handleChange }: IField) {
	return (
		<div className={`form-input select${required ? " required" : ""}`} key={name}>
			<label className="label" htmlFor={name}>
				{label}
			</label>
			<input
				className="native-input"
				id={name}
				name={name}
				type="date"
				value={value}
				onChange={handleChange}
			/>
		</div>
	)
}
/* <TextField
			key={name}
			required={required}
			className={`form-input text`}
			label={label}
			{...typeMap[type]}
			value={value}
			onChange={handleChange}
		/> */
