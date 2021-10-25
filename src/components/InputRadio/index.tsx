import React from "react"

// Dependencies...
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import RadioGroup from "@mui/material/RadioGroup"
import Radio from "@mui/material/Radio"

// Types...
import { IInputRadioProps } from "types/FormInput"

export default function InputRadio({
	name,
	value,
	label,
	required,
	options,
	handleChange
}: IInputRadioProps) {
	
	const requiredAttr = required ? { component: "fieldset" } : {}

	return (
		<FormControl component="fieldset" key={name}>
			<FormLabel {...requiredAttr}>{label}</FormLabel>
			<RadioGroup value={value} onChange={handleChange} aria-label={label}>
				{options.map((option) => (
					<FormControlLabel
						value={option.toLowerCase()}
						control={<Radio />}
						label={option}
						key={option}
					/>
				))}
			</RadioGroup>
		</FormControl>
	)
}
