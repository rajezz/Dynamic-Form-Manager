import React, { useState } from "react"

// Library components...
import Button from "@mui/material/Button"

// Type...
import { IField } from "types/FormInput"

import {
	TYPE_TEXT,
	TYPE_PARAGRAPH,
	TYPE_NUMBER,
	TYPE_EMAIL,
	TYPE_PHONE,
	TYPE_PIN_CODE,
	TYPE_CHECKBOX,
	TYPE_RADIO,
	TYPE_DROPDOWN,
	TYPE_MULTI_DROPDOWN,
	TYPE_DATE,
	TYPE_ELEMENT_MAP
} from "_data/form-data"

// Components...
import InputCheckbox from "components/InputCheckbox"
import InputRadio from "components/InputRadio"
import InputText from "components/InputText"
import InputSelect from "components/InputSelect"

export default function FormBuilder({ fields, onChange }: { fields: any[]; onChange: any }) {
	/* function getRequiredField({ field }: { field: IField }) {
        switch (field.type) {
			case TYPE_TEXT:
			case TYPE_PARAGRAPH:
			case TYPE_NUMBER:
			case TYPE_EMAIL:
			case TYPE_PHONE:
			case TYPE_PIN_CODE:
				break
			case TYPE_DROPDOWN:
			case TYPE_MULTI_DROPDOWN:
				break
			case TYPE_DATE:
				break
            case TYPE_CHECKBOX:
                return (
					<InputCheckbox
						handleChange={(e: any) => onChange(field.name, e.currentTarget.checked)}
						{...field}
					/>
				) 
				break
            case TYPE_RADIO:
                return (
					<InputRadio
						handleChange={(e: any) => onChange(field.name, e.currentTarget.value)}
						{...field}
					/>
				)
				break
		}
    } */

    function handleChange(event: any, field: IField) {
        let value:any = null
        switch (field.type) {
			case TYPE_TEXT:
			case TYPE_PARAGRAPH:
			case TYPE_NUMBER:
			case TYPE_EMAIL:
			case TYPE_PHONE:
			case TYPE_PIN_CODE:
			case TYPE_RADIO:
				value = event.currentTarget.value
				break
			case TYPE_DROPDOWN:
            case TYPE_MULTI_DROPDOWN:
                value = Array.isArray(event) ? event.map((elem: any) => elem.value) : event.value
				handleChange(field.name, value)
				break
			case TYPE_DATE:
				break
			case TYPE_CHECKBOX:
				value = event.currentTarget.checked
				break
		}
    }

	function getRequiredField({ field }: { field: IField }) {
		const InputElement = TYPE_ELEMENT_MAP[field.type]
		return <InputElement handleChange={(e: any) => handleChange(e, field)} {...field} />
	}
	return (
		<div className="form">
			{fields.map((field) => getRequiredField(field))}
			{/* {formInputsCheckbox.map((input) => (
						<InputCheckbox
							handleChange={(e: any) =>
								handleChange(input.name, e.currentTarget.checked)
							}
							{...input}
							value={values[input.name]}
						/>
					))}
					{formInputsRadio.map((input) => (
						<InputRadio
							handleChange={(e: any) =>
								handleChange(input.name, e.currentTarget.value)
							}
							{...input}
							value={values[input.name]}
						/>
					))}
					{formInputText.map((input) => (
						<InputText
							handleChange={(e: any) =>
								handleChange(input.name, e.currentTarget.value)
							}
							{...input}
							value={values[input.name]}
						/>
					))}
					{formInputSelect.map((input) => (
						<InputSelect
							handleChange={(e: any) => {
								console.log("Selected > ", e)
								const value = Array.isArray(e)
									? e.map((elem: any) => elem.value)
									: e.value
								handleChange(input.name, value)
							}}
							{...input}
							value={values[input.name]}
						/>
					))} */}
		</div>
	)
}
