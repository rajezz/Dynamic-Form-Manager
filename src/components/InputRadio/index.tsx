import React from "react"

// Dependencies...
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import RadioGroup from "@mui/material/RadioGroup"
import Radio from "@mui/material/Radio"

// Types...
import { IField } from "types/FormInput"

const optionFormatter = (options: Array<string> | string | undefined): Array<any> => {
	if (Array.isArray(options)) {
		return options.map((option) => option)
	} else if (typeof options === "string") {
		const splits = options.split(",")
		return splits.map((option: string) => option.trim())
	} else {
		return []
	}
}
export default function InputRadio({
	name,
	value,
	label,
	required,
	options,
	handleChange
}: IField) {
	return (
		<FormControl
			className={`form-input radio${required ? " required" : ""}`}
			component="fieldset"
			key={name}>
			<label className="label">{label}</label>
			<RadioGroup value={value} onChange={handleChange} aria-label={label}>
				{optionFormatter(options).map((option) => (
					<FormControlLabel
						value={option}
						control={<Radio />}
						label={option}
						key={option}
					/>
				))}
			</RadioGroup>
		</FormControl>
	)
}
