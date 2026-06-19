import IconButton from "../buttons/IconButton"
import TextField from "../fields/TextField"

interface Props {
    items: {
        id: string,
        name: string,
        quantity: number
    }[],
    onItemIdChange: (e: any, index: number) => void,
    onItemNameChange: (e: any, index: number) => void,
    onItemQuantityChange: (e: any, index: number) => void,
    deleteItem: (e:any, index: number) => void
    onFocus: (idx: number) => void
}

function InputItemTable({ items, onItemIdChange, onItemNameChange, onItemQuantityChange, deleteItem, onFocus }: Props) {
    const columns = ['No', 'Kode Barang', 'Nama Barang', 'Jumlah']

    return (
    <table className={`w-full text-left`}>
        <thead className={`bg-gray-50 border-b border-gray-300`}>
            <tr>
                <th className={`w-12 py-3 font-bold text-gray-600 uppercase text-xs relative text-center`}>{ columns[0] }</th>
                <th className={`w-60 px-3 py-3 font-bold text-gray-600 uppercase text-xs relative`}>{ columns[1] }</th>
                <th className={`px-3 py-3 font-bold text-gray-600 uppercase text-xs relative`}>{ columns[2] }</th>
                <th className={`w-10 px-3 py-3 font-bold text-gray-600 uppercase text-xs relative`}>{ columns[3] }</th>
            </tr>
        </thead>
        <tbody className={`text-sm`}>
            { ...items.map((item, index) => (
                <tr className={`border-b border-gray-300`}>
                    <td className={`py-4 font-semibold text-center`}>{ index + 1 }</td>
                    <th className={`px-3 py-4 font-semibold`}>
                        <TextField needLabel={false} title={`Kode Barang no ${index + 1}`} type='text' id='id' value={item.id} onChange={(e) => onItemIdChange(e, index)} onFocus={() => onFocus(index)}/>
                    </th>
                    <td className={`px-3 py-4 text-gray-600 font-medium`}>
                        <TextField needLabel={false} title={`Nama Barang no ${index + 1}`} type='text' id='name' value={item.name} onChange={(e) => onItemNameChange(e, index)} onFocus={() => onFocus(index)}/>
                    </td>
                    <td className={`px-3 py-4 text-gray-600 font-medium`}>
                        <TextField needLabel={false} title={`Jumlah Barang no ${index + 1}`} type='number' id='quantity' value={item.quantity} onChange={(e) => onItemQuantityChange(e, index)} onFocus={() => onFocus(index)}/>
                    </td>
                    <td className={`px-3 py-4 flex justify-center items-center`}>
                        <IconButton type='delete' title='Hapus' onClick={(e:any) => deleteItem(index, e)}/>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)}

export default InputItemTable