import styled from '@emotion/styled'
import { useState, useEffect } from 'react'

interface RInputTextProps {
	modeEditDefault?: true | false
	value: string
	name: string
	placeholder: string
	style?: 'title' | 'simple'
	showDeleteButton?: boolean
	onChange: (newName: string) => Promise<void>
	onDelete?: () => Promise<void>
}

export function InputText({
	modeEditDefault = false,
	value,
	name,
	placeholder,
	style = 'simple',
	showDeleteButton = false,
	onChange,
	onDelete
}: RInputTextProps) {

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

	const renderModeEdit = () => (
		<form onSubmit={submitForm}>
			<Label htmlFor='groupName'>Name</Label>
			<Input
				genericStyles={genericStyle}
				type='text'
				name={name}
				value={inputValue}
				onChange={changeInput}
				placeholder={placeholder}
				autoFocus
			/>
			<input type='submit' formAction='1' name='save' value='Save' />
			{!!value && <input type='submit' formAction='2' name='undo' value='Undo' />}
		</form>
	)

	const renderModeView = () => (
		<Div genericStyles={genericStyle}>
			{value}
			<button onClick={edit}>Edit</button>
		</Div>
	)

	return (
		<Container>
			{ modeEdit ? renderModeEdit() : renderModeView() }
			{ showDeleteButton && <button onClick={onDelete}>Delete</button> }
		</Container>
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

const Container = styled.div`
	display: flex;
	flex-direction: row;
`
