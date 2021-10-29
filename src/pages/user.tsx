import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

// Layouts...
import Layout from "layout/Layout"
import Profile from "section/Profile"
import Title from "section/Title"
import UserContent from "section/UserContent"

// Library components...
import Button from "@mui/material/Button"

export default function User() {
	const router = useRouter()
	const [email, setEmail] = useState<string | null>("")

	const logoutUser = () => {
		localStorage.removeItem("userType")
		localStorage.removeItem("email")
		router.push("/")
	}
	useEffect(() => {
		const storedUserType = localStorage.getItem("userType")
		const storedEmail = localStorage.getItem("email")

		if (storedUserType === "user") {
			setEmail(storedEmail)
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
				<UserContent email={email} />
			</div>
		</Layout>
	)
}
