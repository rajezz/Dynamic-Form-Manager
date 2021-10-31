import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import React from "react"
import { SuccessIcon, ErrorIcon } from "components/Icon"

interface ISnackBarProps {
	message: string
	success: boolean
}

export default function SnackBar({ message, success }: ISnackBarProps) {
	return (
		<div className={`alert ${success ? "success" : "error"} ${message === "" ? "hide" : ""}`}>
			<div className="icon">{success ? <SuccessIcon /> : <ErrorIcon />}</div>
			<div className="text">{message}</div>
		</div>
	)
}
