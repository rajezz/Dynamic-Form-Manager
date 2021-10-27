import { IInputTextProps, IInputCheckboxProps, IInputRadioProps, IInputSelectProps } from "types/FormInput"

export interface IForm {
	name: string
    fields: Array<IInputTextProps | IInputCheckboxProps | IInputRadioProps | IInputSelectProps>
    status: boolean
    validity: string
    accessibleUser: Array<string>
    createdAt: string
    updatedAt: string
}