import { RiArrowDropDownFill } from "@remixicon/react"
import type { PurchaseOrderType } from "../../types/PurchaseOrderType"
import { ddMMYYYY } from "../../utils/formatDate"
import IconButton from "../buttons/IconButton"

interface Props {
    purchaseOrders: PurchaseOrderType[],
    action: boolean,
    sortBy?: (type: string) => void,
    isAscending?: boolean,
    sortType?: string,
    editPurchaseOrder?: (id: string) => void,
    deletePurchaseOrder?: (id: string) => void
}

function PurchaseOrderTable({purchaseOrders, action, sortBy, isAscending, sortType, editPurchaseOrder, deletePurchaseOrder}: Props) {
    const columns = [
        { key: 'id', title: 'Nomor PO' },
        { key: 'supplier', title: 'Nama Supplier' },
        { key: 'expectedDeliveryDate', title: 'Tanggal Pengiriman' },
        { key: 'createdAt', title: 'Tanggal PO' },
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
            { ...purchaseOrders.map((purchaseOrder) => {
                const expectedDeliveryDate = ddMMYYYY(purchaseOrder.expectedDeliveryDate)
                const createdAt = ddMMYYYY(purchaseOrder.createdAt)
                return <tr className={`border-b border-gray-300`}>
                    <th className={`px-6 py-4 font-semibold`}>{ purchaseOrder.id }</th>
                    <td className={`px-6 py-4 text-gray-600 font-medium`}>{ purchaseOrder.supplier.name }</td>
                    <td className={`px-6 py-4 text-gray-600 font-medium`}>{ expectedDeliveryDate }</td>
                    <td className={`px-6 py-4 text-gray-600 font-medium`}>{ createdAt }</td>
                    { action && <td className={`px-6 py-4 flex flex-row gap-x-2 justify-center`}>
                        { editPurchaseOrder && <IconButton type='edit' title='Edit' onClick={() => editPurchaseOrder(purchaseOrder.id)}/> }
                        { deletePurchaseOrder && <IconButton type='delete' title='Hapus' onClick={() => deletePurchaseOrder(purchaseOrder.id)}/> }
                    </td> }
                </tr>
            })}
        </tbody>
    </table>
)}

export default PurchaseOrderTable