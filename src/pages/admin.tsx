import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

// Layouts...
import Layout from "layout/Layout"
import Profile from "section/ProfileSection"
import Title from "section/TitleSection"
import AdminContent from "section/AdminContent"

// Library components...
import Button from "@mui/material/Button"

export default function Admin() {
	const router = useRouter()
	const [username, setUsername] = useState<string | null>("")

	const logoutUser = () => {
		localStorage.removeItem("userType")
		localStorage.removeItem("username")
		localStorage.removeItem("password")
		router.push("/")
	}
	useEffect(() => {
		const storedUserType = localStorage.getItem("userType")
		const storedUsername = localStorage.getItem("username")

		if (storedUserType === "admin") {
			setUsername(storedUsername)
		} else if (storedUserType === "user") {
			router.push("/user")
		} else {
			router.push("/")
		}
	}, [])
	return (
		<Layout>
			<div className="box-container">
				<Profile name={username} onLogout={logoutUser} />
				<Title />
				<AdminContent />
			</div>
		</Layout>
	)
}
