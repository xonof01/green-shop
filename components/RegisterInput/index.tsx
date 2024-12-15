import Button from "../Button"
import Input from "../Input"
const RegisterInput = () => {
	return (
		<>
			<p className="mb-[14px] text-[#3D3D3D] text-[14px] font-normal leading-[16px]">Enter your email and password to register.</p>
			<Input name="username" type="text" placeholder="Username" extraStyle="mb-[17px]" />
			<Input name="email" type="email" placeholder="Enter your email address" extraStyle="mb-[17px]" />
			<Input name="password" type="password" placeholder="Password" extraStyle="mb-[17px]"/>
			<Input name="confirm_password" type="password" placeholder="Confirm Password" />
			<Button title="Register" type="submit" extraStyle="w-full py-[12px] text-center mt-[27px]" />
		</>
	)
}
export default RegisterInput