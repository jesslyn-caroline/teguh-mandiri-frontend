import { RiArrowDropDownFill } from "@remixicon/react"
import type { ItemType } from "../../types/ItemType"
import IconButton from "../buttons/IconButton"

interface Props {
    items: ItemType[],
    action: boolean,
    sortBy?: (type: string) => void,
    isAscending?: boolean,
    sortType?: string,
    editItem?: (id: string) => void,
    deleteItem?: (id: string) => void,
    onRowSelect?: (id: string, name: string) => void
}

function ItemTable ({items, action, sortBy, isAscending, sortType, editItem, deleteItem, onRowSelect}: Props) {
    const columns = [
        { key: 'id', title: 'Kode Barang' },
        { key: 'name', title: 'Nama Barang' },
        { key: 'stock', title: 'Jumlah Stok' },
    ]

    return (
    <table className={`w-full text-left`}>
        <thead className={`bg-gray-50 border-b border-gray-300`}>
            <tr>
                { columns.map((col) => {
                    return (
                    <th className={`px-6 py-3 font-bold text-gray-600 uppercase text-xs relative`}>
                        { sortBy ? 
                            <>
                                <span onClick={() => sortBy(col.key)} className={`cursor-pointer`}>{ col.title }</span> 
                                { col.key ===  sortType && 
                                <RiArrowDropDownFill className={`absolute right-2 top-1/2 -translate-y-1/2 size-6 text-gray-500 ${isAscending ? 'rotate-0' : 'rotate-180'}`}/> }
                            </> :
                            col.title
                        }
                    </th>
                )})}
                { action && <th className={`px-6 py-3 font-bold text-gray-600 uppercase text-xs text-center`}>Aksi</th> }
            </tr>
        </thead>
        <tbody className={`text-sm`}>
            { ...items.map((item) => (
                <tr className={`border-b border-gray-300 cursor-pointer`} onClick={() => onRowSelect && onRowSelect(item.id, item.name)}>
                    <th className={`px-6 py-4 font-semibold`}>{ item.id }</th>
                    <td className={`px-6 py-4 text-gray-600 font-medium`}>{ item.name }</td>
                    <td className={`px-6 py-4 text-gray-600 font-medium`}>{ item.stock }</td>
                    { action && <td className={`px-6 py-4 flex flex-row gap-x-2 justify-center`}>
                        { editItem && <IconButton type='edit' title='Edit' onClick={() => editItem(item.id)}/> }
                        { deleteItem && <IconButton type='delete' title='Hapus' onClick={() => deleteItem(item.id)}/> }
                    </td> }
                </tr>
            ))}
        </tbody>
    </table>
)}

export default ItemTable