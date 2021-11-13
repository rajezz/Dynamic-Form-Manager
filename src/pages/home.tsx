import React, { useState } from "react"
import type { NextPage } from "next"
import Head from "next/head"

// Library components...
import Button from "@mui/material/Button"

// Data...

// Components...
import InputCheckbox from "components/InputCheckbox"
import InputRadio from "components/InputRadio"
import InputText from "components/InputText"
import InputSelect from "components/InputSelect"

const Home: NextPage = () => {
	const [values, setValues] = useState<any>({
	})

	const handleChange = (name: string, value: any) => {
		setValues((prevValues: any) => ({ ...prevValues, [name]: value }))
		console.log("handleChange called !! ", values)
	}

	return (
		<React.Fragment>
			<div className="page">
				<Head>
					<title>Form Manager</title>
					<meta name="description" content="Create and manage Forms." />
					<link rel="icon" href="/favicon.ico" />
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
					/>
				</Head>
				<div className="title">Dynamic form POC</div>
				<div className="form">
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

				<div className="output">
					<div className="title">Output:</div>
					<div className="content">
					{JSON.stringify(values, null, 2)}
					</div>
				</div>
			</div>
		</React.Fragment>
	)
}

export default Home
