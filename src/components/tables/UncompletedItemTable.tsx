
interface Props {
    items: {id: string, name: string, quantity: number}[],
    onRowSelect: (id: string, name: string, quantity: number) => void
}

function UncompletedItemTable ({items, onRowSelect}: Props) {
    const columns = [
        { key: 'id', title: 'Kode Barang' },
        { key: 'name', title: 'Nama Barang' },
        { key: 'quantity', title: 'Jumlah Pesanan' },
    ]

    return (
    <table className={`w-full text-left`}>
        <thead className={`bg-gray-50 border-b border-gray-300`}>
            <tr>
                { columns.map((col) => {
                    return (
                    <th className={`px-6 py-3 font-bold text-gray-600 uppercase text-xs relative`}>
                        { col.title }
                    </th>
                )})}
            </tr>
        </thead>
        <tbody className={`text-sm`}>
            { ...items.filter((item) => item.quantity > 0).map((item) => (
                <tr className={`border-b border-gray-300 hover:bg-gray-100`} onClick={() => onRowSelect(item.id, item.name, item.quantity)}>
                    <th className={`px-6 py-4 font-semibold`}>{ item.id }</th>
                    <td className={`px-6 py-4 text-gray-600 font-medium`}>{ item.name }</td>
                    <td className={`px-6 py-4 text-gray-600 font-medium`}>{ item.quantity }</td>
                </tr>
            ))}
        </tbody>
    </table>
)}

export default UncompletedItemTable