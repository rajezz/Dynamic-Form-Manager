import React from "react"

// Layouts...
import Layout from "layout/Layout"

// Library components...
import Button from "@mui/material/Button"

export default function Profile({ name, onLogout }:any) {
	return (
		<div className="profile-section">
			<p>Welcome,</p>
			<p>
				<strong>{name}</strong>
			</p>
			<a onClick={onLogout}>Logout</a>
		</div>
	)
}
