import * as React from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"

export default function DataTable({ rows, columns, eventListeners }: any) {
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
								align={column.align}
								style={{ minWidth: column.minWidth }}>
								{column.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row: any) => {
						return (
							<TableRow role="checkbox" tabIndex={-1} key={row.code}>
								{columns.map((column: any) => {
									const value = row[column.id]
									return (
										<TableCell key={column.id} align={column.align}>
											{column.format && typeof value === "number"
												? column.format(value)
												: value}
										</TableCell>
									)
								})}
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
