import React, { useState, Fragment } from "react"
import { useRouter } from "next/router"

// Layouts...

// Library components...
import Button from "@mui/material/Button"

import InputText from "components/InputText"

export default function LoginSection() {
	const router = useRouter()
	const [values, setValues] = useState<any>({})
	const [userType, setUserType] = useState<string>("admin")

	const handleChange = (name: string, value: any) => {
		setValues((prevValues: any) => ({ ...prevValues, [name]: value }))
		console.log("handleChange called !! ", values)
	}
	const userChanged = (event: any) => {
		setUserType(event.target.value)
		console.log("handleChange called !! ", values)
	}
	function authenticate() {
		let valid = false
		localStorage.setItem("userType", userType)

		switch (userType) {
			case "admin":
				const { username, password } = values
				if (username === "admin" && password === "password") {
					localStorage.removeItem("email")
					localStorage.setItem("username", username)
					localStorage.setItem("password", password)
					valid = true
				}
				break
				case "user":
					const { email } = values
					if (email) {
					localStorage.removeItem("username")
					localStorage.removeItem("password")
					localStorage.setItem("email", email)
					valid = true
				}
				break
		}
		valid && router.push(`/${userType}`)
	}

	function showAdminForm() {
		return (
			<Fragment>
				<InputText
					id={1}
					handleChange={(e: any) => handleChange("username", e.currentTarget.value)}
					value={values["username"]}
					label="Username"
					name="username"
					required={true}
					type="TEXT"
				/>
				<InputText
					id={2}
					handleChange={(e: any) => handleChange("password", e.currentTarget.value)}
					value={values["password"]}
					label="Password"
					name="password"
					required={true}
					type="TEXT"
				/>
			</Fragment>
		)
	}
	function showUserForm() {
		return (
			<Fragment>
				<InputText
					id={1}
					handleChange={(e: any) => handleChange("email", e.currentTarget.value)}
					value={values["email"]}
					label="Email"
					name="email"
					required={true}
					type="TEXT"
				/>
			</Fragment>
		)
	}
	return (
		<div className="login-panel">
			<div className="login-form">
				<div className="selection-panel">
					<div className="input-radio">
						<input
							id="admin"
							name="user-type"
							type="radio"
							value="admin"
							onChange={userChanged}
							checked={userType === "admin"}
							className="radio form-control"
						/>
						<label htmlFor="admin" className="input-label">
							Admin login
						</label>
					</div>
					<div className="input-radio">
						<input
							id="user"
							name="user-type"
							value="user"
							type="radio"
							onChange={userChanged}
							className="radio form-control"
						/>
						<label htmlFor="user" className="input-label">
							User login
						</label>
					</div>
				</div>
				<div className="inputs">
					{userType === "admin" ? showAdminForm() : showUserForm()}
					<Button
						className="auth submit"
						variant="contained"
						disableElevation
						color="success"
						onClick={authenticate}>
						Login
					</Button>
				</div>
			</div>
		</div>
	)
}
