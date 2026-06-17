import TextField from "../components/fields/TextField"
import BackButton from "../components/buttons/BackButton"
import TextButton from "../components/buttons/TextButton"
import useItems from "../hooks/useItems"

function ItemAdd() {
    const { addItem } = useItems()

    return (
    <div className={`max-w-480 w-screen min-h-screen h-full flex flex-col gap-y-4 px-16 py-10`}>
        <BackButton redirectPath='/barang' />  
        <form id='item-add-form' 
            onSubmit={(e) => addItem(e)} 
            className={`w-full h-full flex flex-col gap-y-5`}
        >
            <h1 className={`text-lg font-bold`}>Tambah Barang Baru</h1>
            <div className={`grid grid-cols-[320px_1fr] gap-x-4`}>
                <div className={`flex flex-col gap-y-4`}>
                    <TextField title='Kode Barang' type='text' id='id'/>
                    <TextField title='Stok' type='number' id='stock'/>
                </div>
                <div>
                    <TextField title='Nama Barang' type='text' id='name'/>
                </div>
            </div>
            <div className={`h-full flex justify-end items-end`}>
                <TextButton text='Tambah' type='submit'/>
            </div>
        </form>
    </div>   
)}

export default ItemAdd