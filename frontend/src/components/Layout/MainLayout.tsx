import {ReactNode} from "react";
import Header from "../UI/Header";
// import Footer from "../UI/Footer";

type MainLayoutProps =  {
  children: ReactNode;
}

const MainLayout = ({children}:MainLayoutProps) => {
  return(
    <>
      <Header/>
      {children}
      {/* <Footer/> */}
    </>
  )
};

export default MainLayout;