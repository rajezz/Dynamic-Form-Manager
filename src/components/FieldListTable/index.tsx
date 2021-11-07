// Data...
import {
	typeMap,
	fieldTableColumns,
	REDUCER_ACTION_INSERT,
	REDUCER_ACTION_UPDATE,
	REDUCER_ACTION_DELETE,
	REDUCER_ACTION_SELECT,
	REDUCER_ACTION_UNSELECT,
	REDUCER_ACTION_UPDATE_FIELD
} from "_data/constants"

import { IForm } from "types/Form"

//Components...
import { DeleteIcon } from "components/Icon"

// Library components...
import MUIInputText from "components/MUIInputText"
import InputCheckbox from "components/InputCheckbox"
import Select from "react-select"

const valuesFormatter = (value: string): any => ({ value, label: value })

const optionFormatter = (options: Array<string> | undefined): Array<any> | undefined =>
	options?.map((option) => ({ value: option, label: option }))

export default function FieldListTable({
	form,
	dispatch,
}: {
	form: IForm
	dispatch: any
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
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{form.fields?.length === 0 ? (
							<tr className="no-row">
								<td colSpan={fieldTableColumns.length}>
									No forms fields to show. Create one!
								</td>
							</tr>
						) : (
							""
						)}
						{form.fields?.map((field: any, index: number) => {
							return (
								<tr key={field.code}>
									<td>
										<MUIInputText
											id={field["id"]}
											handleChange={(e: any) =>
												dispatch({
													type: REDUCER_ACTION_UPDATE_FIELD,
													id: field.id,
													values: { label: e.currentTarget.value }
												})
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
												dispatch({
													type: REDUCER_ACTION_UPDATE_FIELD,
													id: field.id,
													values: { type: e.value }
												})
											}
											isSearchable={true}
											options={optionFormatter(Object.keys(typeMap))}
										/>
									</td>
									<td>
										{["DROPDOWN", "MULTI_DROPDOWN", "RADIO"].includes(
											field["type"]
										) ? (
											<MUIInputText
												id={field["id"]}
												handleChange={(e: any) =>
													dispatch({
														type: REDUCER_ACTION_UPDATE_FIELD,
														id: field.id,
														values: { options: e.currentTarget.value }
													})
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
												dispatch({
													type: REDUCER_ACTION_UPDATE_FIELD,
													id: field.id,
													values: { required: e.currentTarget.checked }
												})
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
												dispatch({
													type: REDUCER_ACTION_UPDATE_FIELD,
													id: field.id,
													values: { public: e.currentTarget.checked }
												})
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
												dispatch({
													type: REDUCER_ACTION_UPDATE_FIELD,
													id: field.id,
													values: { printable: e.currentTarget.checked }
												})
											}
											value={field["printable"]}
											label="Printable"
											name="printable"
											type="CHECKBOX"
										/>
									</td>
									<td className="delete-action">
										<button
											title="Delete form field"
											className="icon-btn delete"
											onClick={(e) =>
												dispatch({
													type: REDUCER_ACTION_DELETE,
													id: field.id
												})
											}
										>
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
