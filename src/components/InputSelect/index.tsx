import React from "react"

import Select, { OptionsOrGroups } from "react-select"

// Types...
import { IField } from "types/FormInput"

// Data...
import { typeMap } from "_data/constants"

const valuesFormatter = (options: Array<string> | string): any => {
	if (Array.isArray(options)) {
		return options.map((option) => ({ value: option, label: option }))
	} else if (options && typeof options === "string") {
		return { value: options, label: options }
	}
	return null
}

const optionFormatter = (options: Array<string> | string | undefined): Array<any> => {
	if (Array.isArray(options)) {
		return options.map((option) => ({ value: option, label: option }))
	} else if (typeof options === "string") {
		const splits = options.split(",")
		return splits.map((option: string) => ({ value: option.trim(), label: option.trim() }))
	} else {
		return []
	}

}

export default function InputSelect({
	name,
	value,
	label,
	type,
	required,
	options,
	handleChange
}: IField) {
	return (
		<div className={`form-input select${required ? " required" : ""}`} key={name}>
			<label className="label" htmlFor={name}>
				{label}
			</label>
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
