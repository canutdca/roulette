import styled from '@emotion/styled'
import { useState, useEffect } from 'react'

interface RInputTextProps {
	modeEditDefault: true | false
	value: string
	onChange: (newName: string) => Promise<void>
	style?: 'title' | 'simple'
}

export function InputText({ modeEditDefault = false, value, style = 'simple', onChange }: RInputTextProps) {

	const [inputValue, setInputValue] = useState(value)
	const [modeEdit, setmodeEdit] = useState(modeEditDefault)

	const genericStyle = style === 'simple' ? '' : `
		font-size: 1.2rem;
		font-weight: bold;
	`

	useEffect(() => {
		setInputValue(value)
	}, [value])

	const edit = () => setmodeEdit(true)

	const changeInput = (event: any) => setInputValue(event.target.value)

	const submitForm = async (event: any) => {
		event.preventDefault()
		try {
			if (event.nativeEvent.submitter.name === 'save') await onChange(inputValue)
			if (event.nativeEvent.submitter.name === 'undo') setInputValue(value)
			setmodeEdit(false)
		} catch (error) {
			console.log('error', error)
		}
	}

	if (modeEdit) return (
		<form onSubmit={submitForm}>
			<Label htmlFor='groupName'>Name</Label>
			<Input
				genericStyles={genericStyle}
				type='text'
				name='name'
				id='groupName'
				value={inputValue}
				onChange={changeInput}
				placeholder='Group name'
				autoFocus
			/>
			<input type='submit' formAction='1' name='save' value='Save' />
			<input type='submit' formAction='2' name='undo' value='Undo' />
		</form>
	)
	return (
		<Div genericStyles={genericStyle}>
			{value}
			<button onClick={edit}>Edit</button>
		</Div>
	)
}

interface GenericStylesProps {
	genericStyles: string
}

const Label = styled.label`
	display: none;
`

const Input = styled.input<GenericStylesProps>`
	border: none;
	border-bottom: 1px solid #323232;
	padding-left: 0;
	padding-right: 0;
	${(props: GenericStylesProps) => props.genericStyles}
`

const Div = styled.div<GenericStylesProps>`${(props: GenericStylesProps) => props.genericStyles}`

const ErrorMsg = styled.span``
