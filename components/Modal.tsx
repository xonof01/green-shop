"use client"
import { CloseModalIcon } from "@/assets/images/icon"
import React, {ReactNode, SetStateAction} from "react"
interface ModalType {
	isOpen: boolean,
	setIsOpen: React.Dispatch<SetStateAction<boolean>>,
	width: number,
	children: ReactNode
}
const Modal:React.FC<ModalType> = ({isOpen, setIsOpen, width, children}) => {
	return (
		<div onClick={(e) => (e.target as HTMLDivElement).id == "wrapper" ? setIsOpen(false) : ""} id="wrapper" className={`fixed inset-0 backdrop-blur bg-[#C2C3C4] flex items-center justify-center ${!isOpen && "scale-0"}`}>
			<div style={{width: `${width}px`}} className="absolute pt-[50px] pb-[58px] px-[100px] bg-white border-b-[10px] border-[#46A358]">
				<button onClick={() => setIsOpen(false)} className="absolute top-3 right-3"><CloseModalIcon/></button>
				{children}
			</div>
		</div> 
	)
}
export default Modal