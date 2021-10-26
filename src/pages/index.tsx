import React, { useState } from "react"
import type { NextPage } from "next"
import Head from "next/head"

// Data...
import { formInputsCheckbox, formInputsRadio, formInputText } from "_data/form-data"

// Components...
import InputCheckbox from "components/InputCheckbox"
import InputRadio from "components/InputRadio"
import InputText from "components/InputText"

const Home: NextPage = () => {
	const checkboxValues = formInputsCheckbox.reduce<any>(
		(prevValue, input) => ({ ...prevValue, [input.name]: input.value }),
		{}
	)
	const radioValues = formInputsRadio.reduce<any>(
		(prevValue, input) => ({ ...prevValue, [input.name]: input.value }),
		{}
	)

	console.log("Home rendering !! ", checkboxValues, radioValues)
	const [values, setValues] = useState<any>({
		...checkboxValues,
		...radioValues
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
					{formInputsCheckbox.map((input) => (
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
				</div>
			</div>
			<footer>
				<div className="section">
					Developed by <a href="mailto:rajezzandrj@gmail.com">Rajeswaran</a>
				</div>
			</footer>
		</React.Fragment>
	)
}

export default Home
