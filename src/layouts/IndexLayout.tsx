import { Outlet } from "react-router"
import Sidebar from "../components/navigations/Sidebar"

function IndexLayout() {
    return (
    <div className={`max-w-480 w-screen min-h-screen h-full flex flex-row`}>
        <Sidebar />
        <Outlet />
    </div>
)}

export default IndexLayout