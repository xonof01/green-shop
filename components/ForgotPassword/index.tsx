import React from 'react'
import Input from '../Input'
import Button from '../Button'
const ForgotPassword = () => {
	return (
		<>
			<Input name="email" type="email" placeholder="Enter your email" extraStyle="mb-[17px]" />
			<Button title="Get code" type="submit" extraStyle="w-full py-[12px] text-center mt-[27px]" />
		</>
	)
}
export default ForgotPassword
