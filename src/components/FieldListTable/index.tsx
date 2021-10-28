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
										<button className="delete" onClick={(e) => onDelete(index)}>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={20}
												height={20}
												viewBox="0 0 20 20"
												fill="currentColor">
												<path
													fillRule="evenodd"
													d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
													clipRule="evenodd"
												/>
											</svg>
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
