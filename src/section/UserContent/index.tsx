import React, { useState, useEffect } from "react"

// Layouts...
import Layout from "layout/Layout"

// Components...
import UserFormList from "section/UserFormList"
import UserFormCreate from "section/UserFormCreate"

// Library components...
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"

// Types...
import { IForm } from "types/Form"

// Data...
import {
	CONTAINED,
	OUTLINED,
	FORM_LIST,
	FORM_CREATE,
	FORM_SUBMITTED,
	nameLabelMap
} from "_data/form-data"

export default function UserContent(email: any) {
	return (
		<div className="content-section">
			<UserFormList />
		</div>
	)
}
