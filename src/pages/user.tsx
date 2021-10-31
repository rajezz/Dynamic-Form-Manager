import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

// Layouts...
import Layout from "layout/Layout"
import Profile from "section/Profile"
import Title from "section/Title"
import UserContent from "section/UserContent"
import {UserProvider} from "section/UserContext"

// Library components...
import Button from "@mui/material/Button"

export default function User() {
	const router = useRouter()
	const [email, setEmail] = useState<string >("")
	const [pageComponent, setPageComponent] = useState<any>(
		<div className="app-loading">App is Loading...</div>
	)

	const logoutUser = () => {
		localStorage.removeItem("userType")
		localStorage.removeItem("email")
		router.push("/")
	}
	useEffect(() => {
		const storedUserType = localStorage.getItem("userType")
		const storedEmail = localStorage.getItem("email")

		if (storedUserType === "user" && storedEmail) {
			setEmail(storedEmail)
			setPageComponent(<UserContent email={storedEmail} />)
		} else if (storedUserType === "admin") {
			router.push("/admin")
		} else {
			router.push("/")
		}
	}, [])
	return (
		<Layout>
			<div className="box-container">
				<Profile name={email} onLogout={logoutUser} />
				<Title />
				{pageComponent}
				
			</div>
		</Layout>
	)
}
