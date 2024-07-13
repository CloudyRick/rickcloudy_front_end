import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import { Header } from "./Header"
import { IElementProps } from "../types/propType"


const PageLayout = ({ isAuthenticated }: IElementProps) => {
    return (
        <>
          <Header isAuthenticated={isAuthenticated}/>
            <div className="pt-[62px]">
              <Outlet/>
            </div>
          <Footer />
        </>
      )
}

export default PageLayout