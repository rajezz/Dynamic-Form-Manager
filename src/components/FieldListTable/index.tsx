import React from "react"

// Layouts...
import Layout from "layout/Layout"

// Data...
import { typeMap, fieldTableColumns } from "_data/form-data"

import { IForm } from "types/Form"

//Components...
import InputText from "components/InputText"
import InputSelect from "components/InputSelect"
import InputCheckbox from "components/InputCheckbox"
import DeleteIcon from "components/DeleteIcon"

// Library components...
import Select from "react-select"

const valuesFormatter = (value: string): any => ({ value, label: value })

const optionFormatter = (options: Array<string> | undefined): Array<any> | undefined =>
	options?.map((option) => ({ value: option, label: option }))

export default function FieldListTable({
	form,
	handleChange,
	onDelete
}: {
	form: IForm
	handleChange: (index: number, key: string, value: string | boolean) => any
	onDelete: (index: number) => any
}) {
	return (
		<div className="field-list-panel">
			<div className="table-container">
				<table className="table">
					<thead>
						<tr>
							{fieldTableColumns.map((column: any) => (
								<th
									key={column.id}
									align="center"
									style={{ minWidth: column.minWidth }}>
									{column.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{form.fields.length === 0 ? (
							<tr className="no-row">
								<td colSpan={fieldTableColumns.length}>
									No forms fields to show. Create one!
								</td>
							</tr>
						) : (
							""
						)}
						{form.fields.map((field: any, index: number) => {
							return (
								<tr key={field.code}>
									<td>
										<InputText
											id={field["id"]}
											handleChange={(e: any) =>
												handleChange(index, "label", e.currentTarget.value)
											}
											value={field["label"]}
											label="Field name"
											name="label"
											required={true}
											type="TEXT"
										/>
									</td>
									<td>
										<Select
											name="type"
											id="type"
											value={valuesFormatter(field["type"])}
											onChange={(e: any) =>
												handleChange(index, "type", e.value)
											}
											isSearchable={true}
											options={optionFormatter(Object.keys(typeMap))}
										/>
									</td>
									<td>
										{["DROPDOWN", "MULTI_DROPDOWN"].includes(field["type"]) ? (
											<InputText
												id={field["id"]}
												handleChange={(e: any) =>
													handleChange(
														index,
														"options",
														e.currentTarget.value
													)
												}
												value={field["options"]}
												label="Options"
												name="options"
												required={true}
												type="PARAGRAPH"
											/>
										) : (
											<div>N/A</div>
										)}
									</td>
									<td>
										<InputCheckbox
											id={field["id"]}
											handleChange={(e: any) =>
												handleChange(
													index,
													"required",
													e.currentTarget.checked
												)
											}
											value={field["required"]}
											label="Required"
											name="required"
											type="CHECKBOX"
										/>
									</td>
									<td>
										<InputCheckbox
											id={field["id"]}
											handleChange={(e: any) =>
												handleChange(
													index,
													"public",
													e.currentTarget.checked
												)
											}
											value={field["public"]}
											label="Public"
											name="public"
											type="CHECKBOX"
										/>
									</td>
									<td>
										<InputCheckbox
											id={field["id"]}
											handleChange={(e: any) =>
												handleChange(
													index,
													"printable",
													e.currentTarget.checked
												)
											}
											value={field["printable"]}
											label="Printable"
											name="printable"
											type="CHECKBOX"
										/>
									</td>
									<td className="delete-action">
										<button
											className="icon-btn delete"
											onClick={(e) => onDelete(index)}>
											<DeleteIcon />
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}
