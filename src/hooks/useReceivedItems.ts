import { useRef, useState } from "react"
import { receivedItemDefaultValue, type ReceivedItemType } from "../types/ReceivedItemType"
import { getAllPurchaseOrders } from "../apis/purchaseOrders"
import { showToastError, showToastSuccess } from "../components/toasts/Toast"
import type { PurchaseOrderType } from "../types/PurchaseOrderType"
import createItemRecord from "../utils/itemFormat"
import { addNewReceivedItem, getReceivedItemById, deleteReceivedItemById, getAllReceivedItems, updateReceivedItemById } from "../apis/receivedItems"
import { useNavigate } from "react-router"

function useReceivedItems() {
    const navigate = useNavigate()

    // States
    const [receivedItems, setReceivedItems] = useState<ReceivedItemType[]>([])
    const [receivedItem, setReceivedItem] = useState<ReceivedItemType>(receivedItemDefaultValue)

    const [search, setSearch] = useState<string>('')
    const [filtered, setFiltered] = useState<ReceivedItemType[]>([])
    const [isAscending, setIsAscending] = useState<boolean>(true)
    const [sortType, setSortType] = useState<string>('')

    const [purchaseOrderModal, setPurchaseOrderModal] = useState<boolean>(false)
    const [itemModal, setItemModal] = useState<boolean>(false)

    const [uncompletedItemList, setUncompletedItemList] = useState<{id: string, name: string, quantity: number}[]>([])
    const [uncompletedPurchaseOrders, setUncompletedPurchaseOrders] = useState<PurchaseOrderType[]>([])

    const itemFocusIdx = useRef<number>(0)

    const uncompletedItemsFromPO = useRef<Record<string, number>>({})
    const currentItemsQty = useRef<Record<string, number>>({})
    const itemNamesFromPO = useRef<Record<string, string>>({})

    // Controllers
    const onFocusItem = (idx: number) => itemFocusIdx.current = idx

    const onSearchChange = (e: any) => {
        setSearch(e.target.value)
        setFiltered(receivedItems.filter((receivedItem) => 
            receivedItem.id.toLowerCase().includes(e.target.value.toLowerCase()) || 
            receivedItem.supplier.name.toLowerCase().includes(e.target.value.toLowerCase()
        )))
    }

    const onIdChange = (e: any) => setReceivedItem({ ...receivedItem, id: e.target.value })
    const onPurchaseIdChange = (e: any) => {
        setPurchaseOrderModal(true)
        setReceivedItem({ ...receivedItem, purchaseId: e.target.value })
    }
    const onSupplierNameChange = (e: any) => setReceivedItem({ ...receivedItem, supplier: { ...receivedItem.supplier, name: e.target.value } })
    const onDeliveryDateChange = (e: any) => setReceivedItem({ ...receivedItem, deliveryDate: e.target.value })
    const onItemIdChange = (e: any) => {
        if (receivedItem.purchaseId === '') {
            showToastError('Kode PO dibutuhkan untuk memilih barang')
            return
        }
        let items = receivedItem.items
        items[itemFocusIdx.current].id = e.target.value
        setItemModal(true)
        setReceivedItem({ ...receivedItem, items })
    }
    const onItemNameChange = (e: any) => {
        if (receivedItem.purchaseId === '') {
            showToastError('Kode PO dibutuhkan untuk memilih barang')
            return
        }
        let items = receivedItem.items
        items[itemFocusIdx.current].name = e.target.value
        setItemModal(true)
        setReceivedItem({ ...receivedItem, items })
    }
    const onItemQuantityChange = (e: any) => {
        let value = e.target.value
        if (e.target.value === '') value = 0

        value = parseInt(value)

        if (receivedItem.purchaseId === '') {
            showToastError('Kode PO dibutuhkan untuk memilih barang')
            return
        }

        let itemId = receivedItem.items[itemFocusIdx.current].id
        currentItemsQty.current[itemId] += value - receivedItem.items[itemFocusIdx.current].quantity

        let uncompletedItemList = Object.keys(uncompletedItemsFromPO.current).map((id) => ({ 
            id, 
            name: itemNamesFromPO.current[id], 
            quantity: uncompletedItemsFromPO.current[id] - currentItemsQty.current[id]
        }))

        let items = receivedItem.items
        items[itemFocusIdx.current].quantity = e.target.value

        setUncompletedItemList(uncompletedItemList)
        setReceivedItem({ ...receivedItem, items })
    }
    
    // Functions
    const closeItemModal = () => setItemModal(false)
    const closePurchaseOrderModal = () => setPurchaseOrderModal(false)
    
    const selectPurchaseOrder = (purchaseOrder: PurchaseOrderType) => {
        let tmp = purchaseOrder.items
        tmp = tmp.map((item) => ({ ...item, quantity: item.quantity - item.received }))
        console.log(tmp)

        // to combine quantity of items with the same id, stored as Record
        const { itemQty, itemName } = createItemRecord(tmp)
        
        uncompletedItemsFromPO.current = { ...itemQty }
        currentItemsQty.current = { ...itemQty }
        itemNamesFromPO.current = itemName

        // rebuild object from Record
        let items = Object.keys(itemQty).map((id) => ({ id, name: itemName[id], quantity: itemQty[id]}))

        setReceivedItem({  ...receivedItem, purchaseId: purchaseOrder.id, supplier: purchaseOrder.supplier, items })

        closePurchaseOrderModal()
    }

    const selectItem = (id: string, name: string, quantity: number) => {
        let items = receivedItem.items
        items[itemFocusIdx.current] = { id, name, quantity }

        currentItemsQty.current[id] += quantity
        
        let uncompletedItemList = Object.keys(uncompletedItemsFromPO.current).map((id) => ({ 
            id, 
            name: itemNamesFromPO.current[id], 
            quantity: uncompletedItemsFromPO.current[id] - currentItemsQty.current[id] 
        }))

        setUncompletedItemList(uncompletedItemList)
        setReceivedItem({ ...receivedItem, items })
        closeItemModal()
    }

    const addNewRow = () => {
        let items = [ ...receivedItem.items, { id: '', name: '', quantity: 0 } ]
        setReceivedItem({ ...receivedItem, items })
    }

    const deleteItemFromList = (e: any, index: number) => {
        e.preventDefault()

        let items = receivedItem.items
        let deletedItem = items.at(index)
        items = items.filter((_, i) => i !== index)

        currentItemsQty.current[deletedItem!.id] -= deletedItem!.quantity

        let uncompletedItemList = Object.keys(uncompletedItemsFromPO.current).map((id) => ({ 
            id, 
            name: itemNamesFromPO.current[id], 
            quantity: uncompletedItemsFromPO.current[id] - currentItemsQty.current[id] 
        }))

        if (items.length === 0) items = [{ id: '', name: '', quantity: 0 }]

        setUncompletedItemList(uncompletedItemList)
        setReceivedItem({ ...receivedItem, items })
    }
    

    const sortBy = (type: string) => {
        let tmp = receivedItems

        switch (type) {
            case 'id':
                if (isAscending) tmp = tmp.sort((a, b) => b.id.localeCompare(a.id))
                else tmp = tmp.sort((a, b) => a.id.localeCompare(b.id))
                setIsAscending(!isAscending)
                setSortType(type)
                break
            case 'name':
                if (isAscending) tmp = tmp.sort((a, b) => b.supplier.name.localeCompare(a.supplier.name))
                else tmp = tmp.sort((a, b) => a.supplier.name.localeCompare(b.supplier.name))
                setIsAscending(!isAscending)
                setSortType(type)
                break
            case 'deliveryDate':
                if (isAscending) tmp = tmp.sort((a, b) => new Date(b.deliveryDate).getTime() - new Date(a.deliveryDate).getTime())
                else tmp = tmp.sort((a, b) => new Date(a.deliveryDate).getTime() - new Date(b.deliveryDate).getTime())
                setIsAscending(!isAscending)
                setSortType(type)
                break
        }

        setFiltered(tmp)
    }

    // API
    async function getReceivedItems() {
        const response = await getAllReceivedItems()
        
        if (response.isError) showToastError(response.message)
        else {
            setReceivedItems(response.data)
            setFiltered(response.data)
        }
    }

    async function deleteReceivedItem(id: string) {
        const response = await deleteReceivedItemById(id)
        
        if (response.isError) showToastError(response.message)
        else showToastSuccess(response.message)
    }

    async function getUncompletedPurchaseOrders() {
        const response = await getAllPurchaseOrders(false)
        
        if (response.isError) showToastError(response.message)
        else setUncompletedPurchaseOrders(response.data)
    }

    async function addReceivedItem(e: any) {
        e.preventDefault()

        const response = await addNewReceivedItem(receivedItem)
        
        if (response.isError) showToastError(response.message)
        else {
            showToastSuccess(response.message)
            navigate('/penerimaan-barang')
        }
    }

    async function updateReceivedItem(e: any) {
        e.preventDefault()

        const response = await updateReceivedItemById(receivedItem)
        
        if (response.isError) showToastError(response.message)
        else {
            showToastSuccess(response.message)
            navigate('/penerimaan-barang')
        }
    }

    async function getReceivedItem(id: string) {
        const response = await getReceivedItemById(id)
        
        if (response.isError) showToastError(response.message)
        else setReceivedItem(response.data)
    }

    return {
        search, receivedItem, filtered, uncompletedPurchaseOrders, uncompletedItemList,
        purchaseOrderModal, itemModal, itemFocusIdx,
        sortType, isAscending,
        getReceivedItems, getReceivedItem, getUncompletedPurchaseOrders,
        addReceivedItem, addNewRow, deleteReceivedItem, deleteItemFromList, updateReceivedItem,
        closePurchaseOrderModal, closeItemModal,
        onSearchChange, sortBy,
        onIdChange, onPurchaseIdChange, onSupplierNameChange, onDeliveryDateChange,
        onItemIdChange, onItemNameChange, onItemQuantityChange, onFocusItem,
        selectItem, selectPurchaseOrder,
    }
}

export default useReceivedItems