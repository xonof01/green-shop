import Button from "../Button"
import Input from "../Input"

const ResetPassword = () => {
	return (
		<>
			<Input name="password" type="password" placeholder="Enter new password" extraStyle="mb-[17px]" />
			<Input name="otp" type="text" placeholder="Enter otp code" extraStyle="mb-[17px]" />
			<Button title="Reset password" type="submit" extraStyle="w-full py-[12px] text-center mt-[27px]" />
		</>
	)
}

export default ResetPassword