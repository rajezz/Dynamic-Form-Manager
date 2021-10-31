import * as React from "react"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"

import { DeleteIcon, EditIcon } from "components/Icon"


export default function FormListTable({ rows, columns,onUpdate, onDelete }: any) {
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
										title="Edit Form"
										className="icon-btn update"
										onClick={(e) => onUpdate(index)}>
										<EditIcon />
									</button>
									<button
										title="Delete form"
										className="icon-btn delete"
										onClick={(e) => onDelete(index)}>
										<DeleteIcon />
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
