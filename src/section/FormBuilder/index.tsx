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
	TYPE_ELEMENT_MAP,
	CONTAINED
} from "_data/constants"

// Components...
import InputCheckbox from "components/InputCheckbox"
import InputRadio from "components/InputRadio"
import InputText from "components/InputText"
import InputSelect from "components/InputSelect"
import { OUTLINED } from "../../_data/constants"

export default function FormBuilder({
	formName,
	fields,
	onChange,
	onSave,
	onCancel
}: {
	formName: string
	fields: any[] | undefined
	onChange: any
	onSave: any
	onCancel: any
}) {
	function handleChange(event: any, field: IField, i: number) {
		let value: any = null
		switch (field.type) {
			case TYPE_TEXT:
			case TYPE_PARAGRAPH:
			case TYPE_NUMBER:
			case TYPE_EMAIL:
			case TYPE_PHONE:
			case TYPE_DATE:
			case TYPE_PIN_CODE:
			case TYPE_RADIO:
				value = event.currentTarget.value
				break
			case TYPE_DROPDOWN:
			case TYPE_MULTI_DROPDOWN:
				value = Array.isArray(event) ? event.map((elem: any) => elem.value) : event.value
				break
			case TYPE_CHECKBOX:
				value = event.currentTarget.checked
				break
		}
		onChange("value", value, i)
	}

	function getRequiredField(field: IField, i: number) {
		if (field) {
			const InputElement = TYPE_ELEMENT_MAP[field.type]
			return <InputElement {...field} handleChange={(e: any) => handleChange(e, field, i)} />
		}
	}
	return (
		<div className="user-form">
			<div className="title-pane">
				<div className="title">{formName}</div>
				<div className="description">
					Please fill out the form. Fields marked as Asterik (*) are required fields.
				</div>
			</div>
			{fields && fields.length > 0 && fields.map((field, i) => getRequiredField(field, i))}
			<div className="btn-panel">
				<Button variant={CONTAINED} onClick={onSave}>
					Save
				</Button>
				<Button variant={OUTLINED} onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</div>
	)
}
