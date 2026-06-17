import { useEffect } from "react"
import { RiAddLine, RiArrowDropDownFill } from "@remixicon/react"
import { Link } from "react-router"
import useItems from "../hooks/useItems"
import IconButton from "../components/buttons/IconButton"

function ItemList() {
    const { items, getItems, deleteItem, sortBy, isAscending, sortType } = useItems()

    useEffect(() => {
        getItems()
    }, [])

    const columns = [
        { key: 'id', title: 'Kode Barang' },
        { key: 'name', title: 'Nama Barang' },
        { key: 'stock', title: 'Jumlah Stok' },
    ]

    return (
    <div className={`w-full flex flex-col items-end gap-y-5 px-5 py-15`}>
        <Link to='/barang/tambah' title="Tambah Barang" className={`w-fit flex flex-row items-center gap-x-2 py-2 pl-1 pr-3 bg-blue-500 rounded-md`}>
            <RiAddLine className={`size-5 text-white`}/>
            <span className={`text-sm font-semibold text-white`}>Tambah</span>
        </Link>
        <div className={`w-full overflow-x-auto shadow-xs border border-gray-300 rounded-md`}>
            <table className={`w-full text-left`}>
                <thead className={`bg-gray-50 border-b border-gray-300`}>
                    <tr>
                        { columns.map((col) => {
                            return (
                            <th className={`px-6 py-3 font-bold text-gray-600 uppercase text-xs relative`}>
                                <span onClick={() => sortBy(col.key)}>{ col.title }</span>
                                { col.key ===  sortType && 
                                <RiArrowDropDownFill className={`absolute right-2 top-1/2 -translate-y-1/2 size-6 text-gray-500 ${isAscending ? 'rotate-180' : 'rotate-0'}`}/> }
                            </th>
                        )})}
                        <th className={`px-6 py-3 font-bold text-gray-600 uppercase text-xs`}>Aksi</th>
                    </tr>
                </thead>
                <tbody className={`text-sm`}>
                    { ...items.map((item) => (
                        <tr className={`border-b border-gray-300`}>
                            <th className={`px-6 py-4 font-semibold`}>{ item.id }</th>
                            <td className={`px-6 py-4 text-gray-600 font-medium`}>{ item.name }</td>
                            <td className={`px-6 py-4 text-gray-600 font-medium`}>{ item.stock }</td>
                            <td className={`px-6 py-4`}>
                                <IconButton type='delete' title='Hapus' onClick={() => deleteItem(item.id)}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)}

export default ItemList