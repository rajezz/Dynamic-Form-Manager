import * as React from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"

import { CreateIcon, EmailIcon, PDFIcon } from "components/Icon"

export default function UserFormListTable({ rows, columns, onCreate, onDownload, onEmail }: any) {
	/* 	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(10)

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}
 */
	return (
		<TableContainer className="table-container">
			<Table className="table">
				<TableHead>
					<TableRow>
						{columns.map((column: any) => (
							<TableCell
								key={column.id}
								align="center"
								style={{ minWidth: column.minWidth }}>
								{column.label}
							</TableCell>
						))}
						<TableCell key={12} align="center" style={{ minWidth: 100 }}>
							Action
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.length === 0 ? (
						<tr className="no-row">
							<td colSpan={columns.length}>No data to show!</td>
						</tr>
					) : (
						""
					)}
					{rows.map((row: any, index: number) => {
						return (
							<TableRow role="checkbox" tabIndex={-1} key={row.code}>
								{columns.map((column: any) => {
									const value = row[column.id]
									return (
										<TableCell key={column.id} align={column.align}>
											{value}
										</TableCell>
									)
								})}
								<TableCell key={11} align="center">
									<button
										title="Fill/Update the Form"
										className="icon-btn create"
										onClick={(e) => onCreate(index)}>
										<CreateIcon />
									</button>
									<button
										title="Download as PDF"
										className="icon-btn m-l-1 download"
										onClick={(e) => onDownload(index)}>
										<PDFIcon />
									</button>
									<button
										title="Send as Email"
										className="icon-btn m-l-1 email"
										onClick={(e) => onEmail(index)}>
										<EmailIcon />
									</button>
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
