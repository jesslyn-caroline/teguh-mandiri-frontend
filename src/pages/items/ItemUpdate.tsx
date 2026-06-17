import TextField from "../../components/fields/TextField"
import BackButton from "../../components/buttons/BackButton"
import TextButton from "../../components/buttons/TextButton"
import useItems from "../../hooks/useItems"
import { useParams } from "react-router"
import { useEffect } from "react"

function ItemUpdate() {
    const { item, onItemIdChange, onItemNameChange, onItemStockChange, editItem, getItem } = useItems()
    const { id } = useParams()

    useEffect(() => {
        getItem(id as string)
    }, [ id ])

    return ( item && 
    <div className={`max-w-480 w-screen min-h-screen h-full flex flex-col gap-y-4 px-16 py-10`}>
        <BackButton redirectPath='/barang' />  
        <form id='item-edit-form' 
            onSubmit={(e) => editItem(e)} 
            className={`w-full h-full flex flex-col gap-y-5`}
        >
            <h1 className={`text-lg font-bold`}>Edit Barang { item.id }</h1>
            <div className={`grid grid-cols-[320px_1fr] gap-x-4`}>
                <div className={`flex flex-col gap-y-4`}>
                    <TextField title='Kode Barang' type='text' id='id' value={ item.id } onChange={onItemIdChange} />
                    <TextField title='Stok' type='number' id='stock' value={ item.stock } onChange={onItemStockChange} />
                </div>
                <div>
                    <TextField title='Nama Barang' type='text' id='name' value={ item.name } onChange={onItemNameChange}/>
                </div>
            </div>
            <div className={`h-full flex justify-end items-end`}>
                <TextButton text='Update' type='submit'/>
            </div>
        </form>
    </div>   
)}

export default ItemUpdate