import { Link, useLocation } from "react-router"

function Sidebar() {
    const location = useLocation()

    const menu = [
        { path: '/barang', name: 'Daftar Barang' },
        { path: '/supplier', name: 'Daftar Supplier' },
        { path: '/purchase-order', name: 'Purchase Order' },
        { path: '/history-barang', name: 'History Barang' },
    ]

    return (
    <div className={`max-w-60 w-full h-full flex flex-col gap-y-5 bg-slate-50 shadow-md px-5 py-15`}>
        { menu.map((item) => (
            <Link 
                to={item.path}
                className={`w-full px-3 py-1 rounded-md text-md ${location.pathname === item.path ? 'text-gray-700 font-bold' : 'text-gray-500 font-medium'}`}
            >
                {item.name}
            </Link>
        )) }
    </div>
)}

export default Sidebar