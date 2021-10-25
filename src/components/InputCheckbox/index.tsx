import React from "react"

// Dependencies...
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"

// Types...
import { IInputCheckboxProps } from "types/FormInput"

export default function InputCheckbox({ name, value, label, required, handleChange }: IInputCheckboxProps) {
	return (
		<FormControlLabel
			control={
				<Checkbox
					checked={value}
					onChange={handleChange}
					inputProps={{ "aria-label": "controlled" }}
				/>
			}
			label={label}
			key={name}
			className={`form-input checkbox${required ? " required" : ""}`}
		/>
	)
}
