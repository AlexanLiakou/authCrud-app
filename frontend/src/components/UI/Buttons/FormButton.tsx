import { ReactNode } from "react";

  type FormButtonProps = {
    children?: ReactNode,
    type: "submit" | "reset" | "button",
    customClass?: string
  }

const FormButton = ({children, type, customClass}:FormButtonProps) => {
  return (
    <button type={type} className={`p-[10px] bg-[#000] border border-[#000] border-solid outline-none text-[#fff] min-w-[200px] rounded-[5px] cursor-pointer hover:bg-[#fff] hover:text-[#000] ${customClass ? customClass : ''}`}>
      {children}
    </button>
  )
}

export default FormButton;