import { RiAddLine } from "@remixicon/react"
import IconButton from "../buttons/IconButton"
import TextField from "../fields/TextField"

interface Props {
    items: {
        id: string,
        name: string,
        quantity: number,
        received?: number
    }[],
    onItemIdChange: (e: any, index: number) => void,
    onItemNameChange: (e: any, index: number) => void,
    onItemQuantityChange: (e: any, index: number) => void,
    deleteItem: (e:any, index: number) => void
    onFocus: (idx: number) => void,
    addNewRow?: () => void
    purchaseOrderEdit?: boolean
}

function InputItemTable({ items, onItemIdChange, onItemNameChange, onItemQuantityChange, deleteItem, onFocus, addNewRow, purchaseOrderEdit }: Props) {
    const columns = ['No', 'Kode Barang', 'Nama Barang', 'Jumlah']

    return (
    <table className={`w-full text-left`}>
        <thead className={`bg-gray-50 border-b border-gray-300`}>
            <tr className={`font-bold text-gray-600 uppercase text-xs`}>
                <th className={`w-12 px-3 py-3 text-center  `}>{ columns[0] }</th>
                <th className={`w-60 px-3`}>{ columns[1] }</th>
                <th className={`px-3 py-3`}>{ columns[2] }</th>
                <th className={`w-10 px-3 py-3`}>{ columns[3] }</th>
                { purchaseOrderEdit && <th className={`w-10 px-3 py-3`}>Jumlah diterima</th> }
            </tr>
        </thead>
        <tbody className={`text-sm`}>
            { ...items.map((item, index) => (
                <tr className={`border-b border-gray-300  text-gray-600 font-medium`}>
                    <td className={`px-3 py-4 font-semibold text-center text-black`}>{ index + 1 }</td>
                    <td className={`px-3 py-4 font-semibold text-black`}>
                        <TextField needLabel={false} title={`Kode Barang no ${index + 1}`} type='text' id='id' value={item.id} onChange={(e) => onItemIdChange(e, index)} onFocus={() => onFocus(index)}/>
                    </td>
                    <td className={`px-3 py-4`}>
                        <TextField needLabel={false} title={`Nama Barang no ${index + 1}`} type='text' id='name' value={item.name} onChange={(e) => onItemNameChange(e, index)} onFocus={() => onFocus(index)}/>
                    </td>
                    <td className={`px-3 py-4`}>
                        <TextField needLabel={false} title={`Jumlah Barang no ${index + 1}`} type='number' id='quantity' value={item.quantity} onChange={(e) => onItemQuantityChange(e, index)} onFocus={() => onFocus(index)}/>
                    </td>
                    { purchaseOrderEdit && <td className={`px-3 py-4`}>
                        <TextField needLabel={false} title={`Jumlah diterima no ${index + 1}`} type='number' id='received' value={item.received} onChange={(e) => onItemQuantityChange(e, index)} onFocus={() => onFocus(index)} disabled/>
                    </td> }
                    <td className={`px-3 py-4 flex justify-center items-center`}>
                        <IconButton type='delete' title='Hapus' onClick={(e:any) => deleteItem(e, index)}/>
                    </td>  
                </tr>
            ))}
            <tr onClick={addNewRow}>
                <td colSpan={purchaseOrderEdit ? 6 : 5} className={`py-2 text-center cursor-pointer hover:bg-gray-100`}>
                    <RiAddLine className={`inline text-gray-500`}/>
                </td>
            </tr>
        </tbody>
    </table>
)}

export default InputItemTable