import React, { useState, useEffect } from "react"

// Layouts...
import Layout from "layout/Layout"
import DataTable from "components/DynamicTable"

// Library components...
import Button from "@mui/material/Button"

interface Column {
	id: "name" | "code" | "population" | "size" | "density"
	label: string
	minWidth?: number
	align?: "right"
	format?: (value: number) => string
}

const columns: readonly Column[] = [
	{ id: "name", label: "Name", minWidth: 170 },
	{ id: "code", label: "ISO\u00a0Code", minWidth: 100 },
	{
		id: "population",
		label: "Population",
		minWidth: 170,
		align: "right",
		format: (value: number) => value.toLocaleString("en-US")
	},
	{
		id: "size",
		label: "Size\u00a0(km\u00b2)",
		minWidth: 170,
		align: "right",
		format: (value: number) => value.toLocaleString("en-US")
	},
	{
		id: "density",
		label: "Density",
		minWidth: 170,
		align: "right",
		format: (value: number) => value.toFixed(2)
	}
]

interface Data {
	name: string
	code: string
	population: number
	size: number
	density: number
}

function createData(name: string, code: string, population: number, size: number): Data {
	const density = population / size
	return { name, code, population, size, density }
}

const rows = [
	createData("India", "IN", 1324171354, 3287263),
	createData("China", "CN", 1403500365, 9596961),
	createData("Italy", "IT", 60483973, 301340),
	createData("United States", "US", 327167434, 9833520),
	createData("Canada", "CA", 37602103, 9984670),
	createData("Australia", "AU", 25475400, 7692024),
	createData("Germany", "DE", 83019200, 357578),
	createData("Ireland", "IE", 4857000, 70273),
	createData("Mexico", "MX", 126577691, 1972550),
	createData("Japan", "JP", 126317000, 377973),
	createData("France", "FR", 67022000, 640679),
	createData("United Kingdom", "GB", 67545757, 242495),
	createData("Russia", "RU", 146793744, 17098246),
	createData("Nigeria", "NG", 200962417, 923768),
	createData("Brazil", "BR", 210147125, 8515767)
]

export default function AdminFormList() {
	return (
		<div className="content-section form-list">
			<DataTable rows={rows} columns={columns} />
		</div>
	)
}
