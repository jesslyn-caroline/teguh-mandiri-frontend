import { RiArrowDropDownFill } from "@remixicon/react"
import type { ReceivedItemType } from "../../types/ReceivedItemType"
import { ddMMYYYY } from "../../utils/formatDate"
import IconButton from "../buttons/IconButton"

interface Props {
    receivedItems: ReceivedItemType[],
    action: boolean,
    sortBy?: (type: string) => void,
    isAscending?: boolean,
    sortType?: string,
    editReceivedItem: (id: string) => void,
    deleteReceivedItem?: (id: string) => void
}

function ReceivedItemTable({receivedItems, action, sortBy, isAscending, sortType, editReceivedItem, deleteReceivedItem}: Props) {
    const columns = [
        { key: 'id', title: 'Nomor RI' },
        { key: 'supplier', title: 'Nama Supplier' },
        { key: 'deliveryDate', title: 'Tanggal Penerimaan' },
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
                <th className={`px-6 py-3 font-bold text-gray-600 uppercase text-xs text-center`}>Aksi</th>
            </tr>
        </thead>
        <tbody className={`text-sm`}>
            { ...receivedItems.map((receivedItem) => {
                const deliveryDate = ddMMYYYY(receivedItem.deliveryDate)
                return <tr className={`border-b border-gray-300 hover:bg-gray-100`} onClick={() => editReceivedItem(receivedItem.id)}>
                    <th className={`px-6 py-4 font-semibold`}>{ receivedItem.id }</th>
                    <td className={`px-6 py-4 text-gray-600 font-medium`}>{ receivedItem.supplier.name }</td>
                    <td className={`px-6 py-4 text-gray-600 font-medium`}>{ deliveryDate }</td>
                    { action && <td className={`px-6 py-4 flex flex-row gap-x-2 justify-center`}>
                        { editReceivedItem && <IconButton type='edit' title='Edit' onClick={() => editReceivedItem(receivedItem.id)}/> }
                        { deleteReceivedItem && <IconButton type='delete' title='Hapus' onClick={() => deleteReceivedItem(receivedItem.id)}/> }
                    </td> }
                </tr>
            })}
        </tbody>
    </table>
)}

export default ReceivedItemTable