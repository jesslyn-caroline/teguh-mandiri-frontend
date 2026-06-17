import { useState } from "react";
import type { ItemType } from "../types/ItemType";
import { addNewItem, deleteItemById, getAllItems, getItemById, updateItemById } from "../apis/items";
import { showToastError, showToastSuccess } from "../components/toasts/Toast";
import { useNavigate } from "react-router";

function useItems() {
    const navigate = useNavigate()

    const [items, setItems] = useState<ItemType[]>([])

    const [search, setSearch] = useState<string>('')
    const [filteredItems, setFilteredItems] = useState<ItemType[]>([])
    const [isAscending, setIsAscending] = useState<boolean>(true)
    const [sortType, setSortType] = useState<string>('id')

    const onSearchChange = (e:any) => {
        setSearch(e.target.value)
        setFilteredItems(items.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.id.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    const [item, setItem] = useState<ItemType>({ id: '', name: '', stock: 0 })
    const onItemIdChange = (e:any) => setItem({ ...item, id: e.target.value })
    const onItemNameChange = (e:any) => setItem({ ...item, name: e.target.value })
    const onItemStockChange = (e:any) => setItem({ ...item, stock: e.target.value })
    
    async function getItems() {
        const response = await getAllItems()
        
        if (response.isError) showToastError(response.message)
        else {
            setItems(response.data)
            setFilteredItems(response.data)
        }
    }

    async function getItem(id:string) {
        const response = await getItemById(id)
        
        if (response.isError) showToastError(response.message)
        else setItem(response.data)
    }

    async function addItem(e:any) {
        e.preventDefault()

        let response = await addNewItem(item)

        if (response.isError) showToastError(response.message)
        else {
            showToastSuccess(response.message)
            e.target.reset()
            navigate('/barang')
        }
    }

    async function editItem(e:any) {
        e.preventDefault()

        const response = await updateItemById(item)
        
        if (response.isError) showToastError(response.message)
        else {
            showToastSuccess(response.message)
            navigate('/barang')
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
        let tmp = filteredItems

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

        setFilteredItems(tmp)
    }

    return { 
        filteredItems, search, isAscending, sortType, item,
        onItemIdChange, onItemNameChange, onItemStockChange,  onSearchChange, 
        getItems, getItem, addItem, editItem, deleteItem, sortBy 
    }
}

export default useItems