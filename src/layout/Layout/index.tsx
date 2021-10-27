import React, { Fragment } from "react"
import Footer from "components/Footer"

export default function Layout({ children }: any) {
	return (
		<div className="page">
			<div className="main-body">
			{children}
			</div>
			<Footer />
		</div>
	)
}
