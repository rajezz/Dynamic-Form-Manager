import React, { useState } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

interface InputDialogProps {
	open: boolean
	onClose: any
	onSubmit: any
}

export default function InputDialog({ open, onClose, onSubmit }: InputDialogProps) {
	const [value, setValue] = useState("")

	const handleSendMail = () => {
		if (value) {
			onSubmit(value)
		}
	}
	return (
		<div>
			<Dialog open={open} onClose={onClose}>
				<DialogTitle>Email Address confirmation</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To send the selected form as a mail, please enter your email address here.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Email Address"
						type="email"
						fullWidth
						variant="standard"
						value={value}
						onChange={(event) => setValue(event.currentTarget.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button onClick={handleSendMail}>Send Mail</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
