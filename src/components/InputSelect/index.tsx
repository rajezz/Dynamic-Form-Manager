import React from "react"

import Select, { OptionsOrGroups } from "react-select"

// Types...
import { IInputSelectProps } from "types/FormInput"

// Data...
import { typeMap } from "_data/form-data"

const valuesFormatter = (options: Array<string> | string): Array<any> => {
	if (Array.isArray(options)) {
		return options.map((option) => ({ value: option.toLowerCase(), label: option }))
	}
	return []
}

const optionFormatter = (options: Array<string> | undefined): Array<any> | undefined =>
	options?.map((option) => ({ value: option.toLowerCase(), label: option }))

export default function InputSelect({
	name,
	value,
	label,
	type,
	required,
	options,
	handleChange
}: IInputSelectProps) {
	return (
		<div className={`form-input select${required ? " required" : ""}`} key={name}>
			<label htmlFor={name}>{label}</label>
			<Select
				id={name}
				name={name}
				defaultValue={valuesFormatter(value)}
				onChange={handleChange}
				isSearchable={true}
				isMulti={type === "MULTI_DROPDOWN" ? true : false}
				options={optionFormatter(options)}
			/>
		</div>
	)
}
