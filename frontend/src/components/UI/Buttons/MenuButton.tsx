import { ReactNode } from "react";

  type MenuButtonProps = {
    children: ReactNode,
    onClick: () => void 
  }

const MenuButton = ({children, onClick}:MenuButtonProps) => {
  return (
    <button className="p-[5px] pb-[1px] bg-[#fff] border-none outline-none" onClick={onClick}>
      {children}
    </button>
  )
}

export default MenuButton;