import { useEffect } from "react"
import { RiAddLine, RiArrowDropDownFill } from "@remixicon/react"
import { useNavigate } from "react-router"
import useItems from "../../hooks/useItems"
import IconButton from "../../components/buttons/IconButton"
import SearchInput from "../../components/fields/SearchInput"
import IconTextButton from "../../components/buttons/IconTextButton"

function ItemList() {
    const navigate = useNavigate()
    const { filteredItems, search, isAscending, sortType, onSearchChange, getItems, deleteItem, sortBy } = useItems()

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
        <div className={`w-full flex flex-row items-center gap-x-3`}>
            <SearchInput placeholder='Cari Barang' value={search} onChange={onSearchChange} />
            <IconTextButton Icon={RiAddLine} title='Tambah Barang' text='Tambah' onClick={() => navigate('/barang/tambah')} />
        </div>
        
        <div className={`w-full overflow-x-auto shadow-xs border border-gray-300 rounded-md`}>
            <table className={`w-full text-left`}>
                <thead className={`bg-gray-50 border-b border-gray-300`}>
                    <tr>
                        { columns.map((col) => {
                            return (
                            <th className={`px-6 py-3 font-bold text-gray-600 uppercase text-xs relative`}>
                                <span onClick={() => sortBy(col.key)} className={`cursor-pointer`}>{ col.title }</span>
                                { col.key ===  sortType && 
                                <RiArrowDropDownFill className={`absolute right-2 top-1/2 -translate-y-1/2 size-6 text-gray-500 ${isAscending ? 'rotate-180' : 'rotate-0'}`}/> }
                            </th>
                        )})}
                        <th className={`px-6 py-3 font-bold text-gray-600 uppercase text-xs text-center`}>Aksi</th>
                    </tr>
                </thead>
                <tbody className={`text-sm`}>
                    { ...filteredItems.map((item) => (
                        <tr className={`border-b border-gray-300`}>
                            <th className={`px-6 py-4 font-semibold`}>{ item.id }</th>
                            <td className={`px-6 py-4 text-gray-600 font-medium`}>{ item.name }</td>
                            <td className={`px-6 py-4 text-gray-600 font-medium`}>{ item.stock }</td>
                            <td className={`px-6 py-4 flex flex-row gap-x-2 justify-center`}>
                                <IconButton type='edit' title='Edit' onClick={() => navigate(`/barang/edit/${item.id}`)}/>
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