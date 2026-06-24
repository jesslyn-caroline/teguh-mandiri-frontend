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
    deletePurchaseOrder?: (id: string) => void,
    needExpectedDeliveryDate?: boolean,
    onRowSelect?: (purchaseOrder: PurchaseOrderType) => void,
    needStatus?: boolean
}

function PurchaseOrderTable({purchaseOrders, action, sortBy, isAscending, sortType, editPurchaseOrder, deletePurchaseOrder, needExpectedDeliveryDate=true, onRowSelect, needStatus=true}: Props) {
    const columns = [
        { key: 'id', title: 'Nomor PO', isNeeded: true },
        { key: 'supplier', title: 'Nama Supplier', isNeeded: true },
        { key: 'expectedDeliveryDate', title: 'Tanggal Pengiriman', isNeeded: needExpectedDeliveryDate },
        { key: 'createdAt', title: 'Tanggal PO', isNeeded: true },
        { key: 'status', title: 'Status', isNeeded: needStatus },
    ]

    return (
    <table className={`w-full text-left`}>
        <thead className={`bg-gray-50 border-b border-gray-300`}>
            <tr>
                { columns.map((col) => {
                    if (!col.isNeeded) return
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
            { ...purchaseOrders.map((purchaseOrder) => {
                const expectedDeliveryDate = ddMMYYYY(purchaseOrder.expectedDeliveryDate)
                const createdAt = ddMMYYYY(purchaseOrder.createdAt)
                return <tr className={`border-b border-gray-300 cursor-pointer hover:bg-gray-100`} onDoubleClick={() => editPurchaseOrder && editPurchaseOrder(purchaseOrder.id)}>
                    <th onClick={() => onRowSelect && onRowSelect(purchaseOrder)} className={`px-6 py-4 font-semibold`}>{ purchaseOrder.id }</th>
                    <td onClick={() => onRowSelect && onRowSelect(purchaseOrder)} className={`px-6 py-4 text-gray-600 font-medium`}>{ purchaseOrder.supplier.name }</td>
                    { needExpectedDeliveryDate && <td className={`px-6 py-4 text-gray-600 font-medium`}>{ expectedDeliveryDate }</td> }
                    <td onClick={() => onRowSelect && onRowSelect(purchaseOrder)} className={`px-6 py-4 text-gray-600 font-medium`}>{ createdAt }</td>
                    { needStatus && <td onClick={() => onRowSelect && onRowSelect(purchaseOrder)} className={`px-6 py-4 text-gray-600 font-medium`}>{ purchaseOrder.isCompleted ? 'Selesai' : 'Belum Selesai' }</td> }
                    { action && <td className={`px-6 py-4 flex flex-row gap-x-2 justify-center`}>
                        { deletePurchaseOrder && <IconButton type='delete' title='Hapus' onClick={() => deletePurchaseOrder(purchaseOrder.id)}/> }
                    </td> }
                </tr>
            })}
        </tbody>
    </table>
)}

export default PurchaseOrderTable