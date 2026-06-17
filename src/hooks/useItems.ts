import { useState } from "react";
import type { ItemType } from "../types/ItemType";
import { addNewItem, deleteItemById, getAllItems } from "../apis/items";
import { showToastError, showToastSuccess } from "../components/toasts/Toast";

function useItems() {
    const [items, setItems] = useState<ItemType[]>([])
    const [isAscending, setIsAscending] = useState<boolean>(true)
    const [sortType, setSortType] = useState<string>('id')

    async function getItems() {
        const response = await getAllItems()
        
        if (response.isError) showToastError(response.message)
        else setItems(response.data)
    }

    async function addItem(e:any) {
        e.preventDefault()
        
        const formData = new FormData(e.target)
        const itemData:ItemType = {
            id: formData.get('id') as string,
            name: formData.get('name') as string,
            stock: Number(formData.get('stock')),
        }

        let response = await addNewItem(itemData)

        if (response.isError) showToastError(response.message)
        else {
            showToastSuccess(response.message)
            e.target.reset()
            window.location.href = '/barang'
        }
    }

    async function deleteItem(id:string) {
        const response = await deleteItemById(id)
        
        if (response.isError) showToastError(response.message)
        else {
            getItems()
            showToastSuccess(response.message)
        }
    }

    function sortBy(type:string) {
        let tmp = items

        switch (type) {
            case 'id': 
                if (isAscending) tmp = tmp.sort((a, b) => b.id.localeCompare(a.id))
                else tmp = tmp.sort((a, b) => a.id.localeCompare(b.id))
                setIsAscending(!isAscending)
                setSortType(type)
                break
            case 'name':
                if (isAscending) tmp = tmp.sort((a, b) => b.name.localeCompare(a.name))
                else tmp = tmp.sort((a, b) => a.name.localeCompare(b.name))
                setIsAscending(!isAscending)
                setSortType(type)
                break
            case 'stock':
                if (isAscending) tmp = tmp.sort((a, b) => b.stock - a.stock)
                else tmp = tmp.sort((a, b) => a.stock - b.stock)
                setIsAscending(!isAscending)
                setSortType(type)
                break
        }

        setItems(tmp)
    }

    return { items, getItems, addItem, deleteItem, sortBy, isAscending, sortType }
}

export default useItems