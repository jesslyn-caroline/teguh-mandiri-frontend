import { useRef, useState } from "react";
import { purchaseOrderDefaultValue, type PurchaseOrderType } from "../types/PurchaseOrderType";
import { addNewPurchaseOrder, deletePurchaseOrderById, getAllPurchaseOrders, getPurchaseOrderById, updatePurchaseOrderById } from "../apis/purchaseOrders";
import { showToastError, showToastSuccess } from "../components/toasts/Toast";
import { useNavigate } from "react-router";

function usePurchaseOrders() {
    const navigate = useNavigate()

    // States
    const [orders, setOrders] = useState<PurchaseOrderType[]>([])
    const [order, setOrder] = useState<PurchaseOrderType>(purchaseOrderDefaultValue)

    const [search, setSearch] = useState<string>('')
    const [filtered, setFiltered] = useState<PurchaseOrderType[]>([])
    const [isAscending, setIsAscending] = useState<boolean>(true)
    const [sortType, setSortType] = useState<string>('id')

    const [supplierModal, setSupplierModal] = useState<boolean>(false)
    const [itemModal, setItemModal] = useState<boolean>(false)

    const itemFocusIdx = useRef(0)

    // Controllers
    const onFocusItem = (idx: number) => itemFocusIdx.current = idx

    const onSearchChange = (e:any) => {
        setSearch(e.target.value)
        setFiltered(orders.filter((order) => 
            order.id.toLowerCase().includes(e.target.value.toLowerCase()) || 
            order.supplier.name.toLowerCase().includes(e.target.value.toLowerCase()
        )))
    }

    const onIdChange = (e:any) => setOrder({ ...order, id: e.target.value })
    const onSupplierIdChange = (e:any) => {
        setSupplierModal(true)
        setOrder({ ...order, supplier: { ...order.supplier, id: e.target.value } })
    }
    const onSupplierNameChange = (e: any) => {
        setSupplierModal(true)
        setOrder({ ...order, supplier: { ...order.supplier, name: e.target.value } })
    }
    const onExpectedDeliveryDateChange = (e:any) => setOrder({ ...order, expectedDeliveryDate: new Date(e.target.value) })
    const onCreatedAtChange = (e:any) => setOrder({ ...order, createdAt: new Date(e.target.value) })
    const onItemIdChange = (e:any) => {
        let items = order.items
        items[itemFocusIdx.current].id = e.target.value
        setItemModal(true)
        setOrder({ ...order, items })
    }
    const onItemNameChange = (e:any) => {
        let items = order.items
        items[itemFocusIdx.current].name = e.target.value
        setItemModal(true)
        setOrder({ ...order, items })
    }
    const onItemQuantityChange = (e:any) => {
        let items = order.items
        items[itemFocusIdx.current].quantity = e.target.value
        setOrder({ ...order, items })
    }

    // Functions
    const closeSupplierModal = () => setSupplierModal(false)
    const closeItemModal = () => setItemModal(false)

    const selectSupplier = (id: string, name: string) => {
        setOrder({ ...order, supplier: { id, name } })
        closeSupplierModal()
    }

    const sortBy = (type: string) => {
        let tmp = orders

        switch (type) {
            case 'id':
                if (isAscending) tmp = tmp.sort((a, b) => b.id.localeCompare(a.id))
                else tmp = tmp.sort((a, b) => a.id.localeCompare(b.id))
                setIsAscending(!isAscending)
                setSortType(type)
                break
            case 'supplier':
                if (isAscending) tmp = tmp.sort((a, b) => b.supplier.name.localeCompare(a.supplier.name))
                else tmp = tmp.sort((a, b) => a.supplier.name.localeCompare(b.supplier.name))
                setIsAscending(!isAscending)
                setSortType(type)
                break
            case 'expectedDeliveryDate':
                if (isAscending) tmp = tmp.sort((a, b) => new Date(b.expectedDeliveryDate).getTime() - new Date(a.expectedDeliveryDate).getTime())
                else tmp = tmp.sort((a, b) => new Date(a.expectedDeliveryDate).getTime() - new Date(b.expectedDeliveryDate).getTime())
                setIsAscending(!isAscending)
                setSortType(type)
                break
            case 'createdAt':
                if (isAscending) tmp = tmp.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                else tmp = tmp.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                setIsAscending(!isAscending)
                setSortType(type)
                break
        }

        setFiltered(tmp)
    }

    const deleteItemFromList = (e: any, idx: number) => {
        e.preventDefault()

        let items = order.items
        items = items.filter((_, i) => i !== idx)

        if (order.items.length === 1) items = [{ id: '', name: '', quantity: 0, received: 0 }]
        setOrder({ ...order, items })
    }

    const selectItem = (id: string, name: string) => {
        let items = order.items
        items[itemFocusIdx.current] = { ...items[itemFocusIdx.current], id, name }
        items = [...items, { id: '', name: '', quantity: 0, received: 0 }]
        setOrder({ ...order, items })
        closeItemModal()
    }

    const addNewRow = () => setOrder({ ...order, items: [...order.items, { id: '', name: '', quantity: 0, received: 0 }] })

    // API
    async function getOrders(isCompleted?: boolean) {
        const response = await getAllPurchaseOrders(isCompleted)
        
        if (response.isError) showToastError(response.message)
        else {
            setOrders(response.data)
            setFiltered(response.data)
        }
    }

    async function getOrder(id: string) {
        const response = await getPurchaseOrderById(id)

        if (response.isError) showToastError(response.message)
        else setOrder(response.data)
    }

    async function addOrder(e: any) {
        e.preventDefault()

        let purchaseOrderCopy = { ...order }
        if (purchaseOrderCopy.items.at(-1)?.id === '') purchaseOrderCopy.items.pop()
    
        const response = await addNewPurchaseOrder(purchaseOrderCopy)

        if (response.isError) showToastError(response.message)
        else {
            showToastSuccess(response.message)
            navigate('/purchase-order')
        }
    }

    async function updateOrder(e: any) {
        e.preventDefault()

        const response = await updatePurchaseOrderById(order)

        if (response.isError) showToastError(response.message)
        else {
            showToastSuccess(response.message)
            navigate('/purchase-order')
        }
    }

    async function deleteOrder(id: string) {
        const response = await deletePurchaseOrderById(id)

        if (response.isError) showToastError(response.message)
        else {
            showToastSuccess(response.message)
            getOrders()
        }
    }

    return { 
        filtered, search, isAscending, sortType, itemFocusIdx, order, supplierModal, itemModal, 
        onFocusItem, onSearchChange, onIdChange, onSupplierIdChange, onSupplierNameChange, onExpectedDeliveryDateChange, onCreatedAtChange, onItemIdChange, onItemNameChange, onItemQuantityChange, 
        sortBy, closeSupplierModal, closeItemModal, selectSupplier, selectItem, deleteItemFromList, addNewRow,      
        getOrders, addOrder, deleteOrder, getOrder, updateOrder
    }
}

export default usePurchaseOrders