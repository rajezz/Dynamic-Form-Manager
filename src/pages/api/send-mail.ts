import * as SendgridLib from "@sendgrid/mail"
const SENDGRID_APIKEY = "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"

export default async function handler(req:any, res:any) {
	if (req.method === "POST") {
		try {
			console.log("Request body > ", req.body.body)
			SendgridLib.setApiKey(SENDGRID_APIKEY)
			console.log("Request body > ", req.body.body)
			const { to, subject, html, from } = JSON.parse(req.body.body)
			console.log("to, subject, html, from  > ", to, subject, html, from)
			const body = {
				to,
				from,
				subject,
				html
            }
            console.log(body)
			const response = await SendgridLib.send(body)
			res.status(200).json({ status: 200, message: "Mail sent successfully", log: response })
		} catch (error) {
			res.status(500).json({ status: 500, message: "Couldn't send mail", log: JSON.stringify(error) })
		}
	}
}
