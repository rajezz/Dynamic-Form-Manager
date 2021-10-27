import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

// Layouts...
import Layout from "layout/Layout"
import Profile from "section/Profile"
import Title from "section/Title"
import Content from "section/Content"

// Library components...
import Button from "@mui/material/Button"

export default function Admin() {
	const router = useRouter()
	const [userType, setUserType] = useState<string | null>("")
	const [username, setUsername] = useState<string | null>("")

	const logoutUser = () => {
		localStorage.removeItem("userType")
		localStorage.removeItem("username")
		localStorage.removeItem("password")
		router.push("/")
	}
	useEffect(() => {
		setUserType(localStorage.getItem("userType"))
		setUsername(localStorage.getItem("username"))
		
	}, [])
	return (
		<Layout>
			<div className="box-container">
				<Profile name={username} onLogout={logoutUser} />
				<Title />
				<Content />
			</div>
		</Layout>
	)
}
