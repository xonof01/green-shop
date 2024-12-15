import Button from "../Button"
import Input from "../Input"
interface VerifyRegisterType {
	registerEmail: string
}
const VerifyRegister:React.FC<VerifyRegisterType> = ({registerEmail}) => {
	return (
		<>
			<p className="mb-[12px] text-[#3D3D3D] text-[12px] font-normal leading-[16px]">Verify your email {registerEmail} and send verify code.</p>
			<Input name="code" type="text" placeholder="Enter verify code" />
			<Button title="Verify" type="submit" extraStyle="w-full py-[10px] text-center mt-[28px]" />
		</>
	)
}
export default VerifyRegister