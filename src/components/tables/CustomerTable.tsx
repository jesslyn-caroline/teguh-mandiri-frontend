import { RiArrowDropDownFill } from "@remixicon/react"
import type { CustomerType } from "../../types/CustomerType"
import IconButton from "../buttons/IconButton"

interface Props {
    customers: CustomerType[],
    action: boolean,
    sortBy?: (type: string) => void,
    isAscending?: boolean,
    sortType?: string,
    editCustomer?: (id: string) => void,
    deleteCustomer?: (id: string) => void,
    needPhone?: boolean,
    needEmail?: boolean,
    needAddress?: boolean,
    onRowSelect?: (id: string, name: string) => void
}

function CustomerTable ({customers, action, sortBy, isAscending, sortType, editCustomer, deleteCustomer, needPhone=true, needEmail, needAddress=true, onRowSelect}: Props) {
    const columns = [
        { key: 'id', title: 'Kode Customer', isNeeded: true },
        { key: 'name', title: 'Nama Customer', isNeeded: true },
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
            { ...customers.map((customer) => (
                <tr className={`border-b border-gray-300 cursor-pointer hover:bg-gray-100`} onClick={() => onRowSelect && onRowSelect(customer.id, customer.name)} onDoubleClick={() => editCustomer && editCustomer(customer.id)}>
                    <th className={`px-6 py-4 font-semibold`}>{ customer.id }</th>
                    <td className={`px-6 py-4 text-gray-600 font-medium`}>{ customer.name }</td>
                    { needPhone && <td className={`px-6 py-4 text-gray-600 font-medium`}>{ customer.phone }</td> }
                    { needEmail && <td className={`px-6 py-4 text-gray-600 font-medium`}>{ customer.email }</td> }
                    { needAddress && <td className={`px-6 py-4 text-gray-600 font-medium`}>{ customer.address }</td> }
                    { action && <td className={`px-6 py-4 flex flex-row gap-x-2 justify-center`}>
                        { editCustomer && <IconButton type='edit' title='Edit' onClick={() => editCustomer(customer.id)}/> }
                        { deleteCustomer && <IconButton type='delete' title='Hapus' onClick={() => deleteCustomer(customer.id)}/> }
                    </td> }
                </tr>
            ))}
        </tbody>
    </table>
)}

export default CustomerTable