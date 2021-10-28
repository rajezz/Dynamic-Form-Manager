import React from "react"

// Dependencies...
import TextField from "@mui/material/TextField"
import AdapterDateFns from "@mui/lab/AdapterDateFns"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import DesktopDatePicker from "@mui/lab/DesktopDatePicker"

// Types...
import { IInputTextProps } from "types/FormInput"

// Data...

export default function InputDate({ name, value, label, required, handleChange }: IInputTextProps) {
	return (
		<LocalizationProvider key={name} dateAdapter={AdapterDateFns}>
			<DesktopDatePicker
				className={`form-input date${required ? " required" : ""}`}
				label={label}
				inputFormat="MM/dd/yyyy"
				value={value}
				onChange={handleChange}
				renderInput={(params: any) => <TextField size="small" id={name} {...params} />}
			/>
		</LocalizationProvider>
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
