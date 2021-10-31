import * as React from "react"

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import { visuallyHidden } from "@mui/utils"
import Box from "@mui/material/Box"
import TableSortLabel from "@mui/material/TableSortLabel"

import { DeleteIcon, EmailIcon, PDFIcon } from "components/Icon"
import { ISubmittedForm } from "types/Form"

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

type Order = "asc" | "desc"

function getComparator<Key extends keyof ISubmittedForm>(
	order: Order,
	orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], orderBy: any, comparator: (a: T, b: T) => number) {
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) {
			return ["createdAt", "updatedAt"].includes(orderBy) ? -order : order
		}
		return a[1] - b[1]
	})
	return stabilizedThis.map((el) => el[0])
}

export default function SubmittedFormListTable({
	rows,
	columns,
	onDeleteClick,
	onEmailClick,
	onDownloadClick
}: any) {
	const [order, setOrder] = React.useState<Order>("asc")
	const [orderBy, setOrderBy] = React.useState<keyof ISubmittedForm>("formName")

	const createSortHandler =
		(property: keyof ISubmittedForm) => (event: React.MouseEvent<unknown>) => {
			const isAsc = orderBy === property && order === "asc"
			setOrder(isAsc ? "desc" : "asc")
			setOrderBy(property)
		}

	return (
		<TableContainer className="table-container">
			<Table className="table">
				<TableHead>
					<TableRow>
						{columns.map((column: any) => (
							<TableCell
								key={column.id}
								align="center"
								style={{ minWidth: column.minWidth }}
								sortDirection={orderBy === column.id ? order : false}>
								<TableSortLabel
									active={orderBy === column.id}
									direction={orderBy === column.id ? order : "asc"}
									onClick={createSortHandler(column.id)}>
									{column.label}
									{orderBy === column.id ? (
										<Box component="span" sx={visuallyHidden}>
											{order === "desc"
												? "sorted descending"
												: "sorted ascending"}
										</Box>
									) : null}
								</TableSortLabel>
							</TableCell>
						))}
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
					{stableSort(rows, orderBy, getComparator(order, orderBy)).map(
						(row: any, index: number) => {
							return (
								<TableRow role="checkbox" tabIndex={-1} key={row.code}>
									{columns.map((column: any) => {
										const value = row[column.id]
										if (column.id === "action") {
											return (
												<TableCell key={11} align="center">
													<button
														title="Download as PDF"
														className="icon-btn download"
														onClick={(e) => onDownloadClick(row.id)}>
														<PDFIcon />
													</button>
													<button
														title="Send as Email"
														className="icon-btn email"
														onClick={(e) => onEmailClick(row.id)}>
														<EmailIcon />
													</button>
													<button
														title="Delete the submission"
														className="icon-btn delete"
														onClick={(e) => onDeleteClick(row.id)}>
														<DeleteIcon />
													</button>
												</TableCell>
											)
										} else {
											return (
												<TableCell key={column.id} align={column.align}>
													{value}
												</TableCell>
											)
										}
									})}
								</TableRow>
							)
						}
					)}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
