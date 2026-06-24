import { RiArrowDropDownFill } from "@remixicon/react"
import type { SupplierType } from "../../types/SupplierType"
import IconButton from "../buttons/IconButton"

interface Props {
    suppliers: SupplierType[],
    action: boolean,
    sortBy?: (type: string) => void,
    isAscending?: boolean,
    sortType?: string,
    editSupplier?: (id: string) => void,
    deleteSupplier?: (id: string) => void,
    needPhone?: boolean,
    needEmail?: boolean,
    needAddress?: boolean,
    onRowSelect?: (id: string, name: string) => void
}

function SupplierTable ({suppliers, action, sortBy, isAscending, sortType, editSupplier, deleteSupplier, needPhone=true, needEmail, needAddress=true, onRowSelect}: Props) {
    const columns = [
        { key: 'id', title: 'Kode Supplier', isNeeded: true },
        { key: 'name', title: 'Nama Supplier', isNeeded: true },
        { key: 'phone', title: 'Nomor Telepon', isNeeded: needPhone },
        { key: 'email', title: 'Email', isNeeded: needEmail },
        { key: 'address', title: 'Alamat', isNeeded: needAddress },
    ]

    return (
    <table className={`w-full text-left`}>
        <thead className={`bg-gray-50 border-b border-gray-300`}>
            <tr>
                { columns.map((col) => {
                    if (!col.isNeeded) return null
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
            { ...suppliers.map((supplier) => (
                <tr className={`border-b border-gray-300 cursor-pointer hover:bg-gray-100`} onClick={() => onRowSelect && onRowSelect(supplier.id, supplier.name)} onDoubleClick={() => editSupplier && editSupplier(supplier.id)}>
                    <th className={`px-6 py-4 font-semibold`}>{ supplier.id }</th>
                    <td className={`px-6 py-4 text-gray-600 font-medium`}>{ supplier.name }</td>
                    { needPhone && <td className={`px-6 py-4 text-gray-600 font-medium`}>{ supplier.phone }</td> }
                    { needEmail && <td className={`px-6 py-4 text-gray-600 font-medium`}>{ supplier.email }</td> }
                    { needAddress && <td className={`px-6 py-4 text-gray-600 font-medium`}>{ supplier.address }</td> }
                    { action && <td className={`px-6 py-4 flex flex-row gap-x-2 justify-center`}>
                        { editSupplier && <IconButton type='edit' title='Edit' onClick={() => editSupplier(supplier.id)}/> }
                        { deleteSupplier && <IconButton type='delete' title='Hapus' onClick={() => deleteSupplier(supplier.id)}/> }
                    </td> }
                </tr>
            ))}
        </tbody>
    </table>
)}

export default SupplierTable