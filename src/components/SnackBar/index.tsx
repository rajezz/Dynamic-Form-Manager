import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import React from "react"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

interface ISnackBarProps {
    message: string
    type: any
}

export default function SnackBar({ message, type }: ISnackBarProps) {
	return (
		<Snackbar
			anchorOrigin={{ vertical: "top", horizontal: "center" }}
			open={message.length > 0}>
			<Alert severity={type}>{message}</Alert>
		</Snackbar>
	)
}