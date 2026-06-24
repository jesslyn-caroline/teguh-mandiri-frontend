import { RiArrowDropDownFill } from "@remixicon/react"
import type { ItemType } from "../../types/ItemType"
import IconButton from "../buttons/IconButton"

interface Props {
    items: ItemType[],
    sortBy?: (type: string) => void,
    isAscending?: boolean,
    sortType?: string,
    editItem?: (id: string) => void,
    deleteItem?: (id: string) => void,
    onRowSelect?: (id: string, name: string) => void
}

function ItemTable ({items, sortBy, isAscending, sortType, editItem, deleteItem, onRowSelect}: Props) {
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
                    <th className={`px-6 py-3 font-bold text-gray-600 uppercase text-xs relative text-nowrap`}>
                        { sortBy ? 
                            <>
                                <span onClick={() => sortBy(col.key)} className={`cursor-pointer`}>{ col.title }</span> 
                                { col.key ===  sortType && 
                                <RiArrowDropDownFill className={`absolute right-1 top-1/2 -translate-y-1/2 size-6 text-gray-500 ${isAscending ? 'rotate-0' : 'rotate-180'}`}/> }
                            </> :
                            col.title
                        }
                    </th>
                )})}
            </tr>
        </thead>
        <tbody className={`text-sm`}>
            { ...items.map((item) => (
                <tr className={`border-b border-gray-300 hover:bg-gray-100 cursor-pointer`} onDoubleClick={() => editItem && editItem(item.id)}>
                    <th onClick={() => onRowSelect && onRowSelect(item.id, item.name)} className={`px-6 py-4 font-semibold`}>{ item.id }</th>
                    <td onClick={() => onRowSelect && onRowSelect(item.id, item.name)} className={`px-6 py-4 text-gray-600 font-medium`}>{ item.name }</td>
                    <td onClick={() => onRowSelect && onRowSelect(item.id, item.name)} className={`px-6 py-4 text-gray-600 font-medium`}>{ item.stock }</td>
                    { deleteItem && <td className={`px-6 py-4 flex items-center`}>
                        <IconButton type='delete' title='Hapus' onClick={() => deleteItem(item.id)}/> 
                    </td> }
                </tr>
            ))}
        </tbody>
    </table>
)}

export default ItemTable