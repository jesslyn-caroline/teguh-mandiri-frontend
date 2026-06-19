import { useState } from "react";
import type { PurchaseOrderType } from "../types/PurchaseOrderType";
import { addNewPurchaseOrder, deletePurchaseOrderById, getAllPurchaseOrders, getPurchaseOrderById, updatePurchaseOrderById } from "../apis/purchaseOrders";
import { showToastError, showToastSuccess } from "../components/toasts/Toast";
import { useNavigate } from "react-router";

function usePurchaseOrders() {
    const navigate = useNavigate()

    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrderType[]>([])
    const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrderType>({ id: '', supplier: { id: '', name: '' }, expectedDeliveryDate: new Date(), createdAt: new Date(), items: [{ id: '', name: '', quantity: 0, received: 0 }] })

    const [search, setSearch] = useState<string>('')
    const [filteredPOs, setFilteredPOs] = useState<PurchaseOrderType[]>([])
    const [isAscending, setIsAscending] = useState<boolean>(true)
    const [sortType, setSortType] = useState<string>('id')

    const onSearchChange = (e:any) => {
        setSearch(e.target.value)
        setFilteredPOs(purchaseOrders.filter((purchaseOrder) => purchaseOrder.id.toLowerCase().includes(e.target.value.toLowerCase()) || purchaseOrder.supplier.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    function sortBy(type: string) {
        let tmp = purchaseOrders

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
    }

    const [supplierModal, setSupplierModal] = useState<boolean>(false)
    const [itemModal, setItemModal] = useState<boolean>(false)

    const closeSupplierModal = () => setSupplierModal(false)
    const closeItemModal = () => setItemModal(false)

    const [itemFocusIdx, setItemFocusIdx] = useState<number>(0)
    const onFocusItem = (idx: number) => setItemFocusIdx(idx)

    const onPOIdChange = (e:any) => setPurchaseOrder({ ...purchaseOrder, id: e.target.value })
    const onPOSupplierIdChange = (e:any) => {
        setSupplierModal(true)
        setPurchaseOrder({ ...purchaseOrder, supplier: { ...purchaseOrder.supplier, id: e.target.value } })
    }
    const onPOSupplierNameChange = (e: any) => {
        setSupplierModal(true)
        setPurchaseOrder({ ...purchaseOrder, supplier: { ...purchaseOrder.supplier, name: e.target.value } })
    }
    const selectSupplier = (id: string, name: string) => {
        setPurchaseOrder({ ...purchaseOrder, supplier: { id, name } })
        closeSupplierModal()
    }
    const onPOExpectedDeliveryDateChange = (e:any) => setPurchaseOrder({ ...purchaseOrder, expectedDeliveryDate: new Date(e.target.value) })
    const onPOCreatedAtChange = (e:any) => setPurchaseOrder({ ...purchaseOrder, createdAt: new Date(e.target.value) })
    const onPOItemIdChange = (e:any) => {
        setItemModal(true)
        setPurchaseOrder({ ...purchaseOrder, 
            items: [
                ...purchaseOrder.items.map((item, i) => {
                    if (i === itemFocusIdx) return { ...item, id: e.target.value }
                    else return item
                })
            ] 
        })
    }
    const onPOItemNameChange = (e:any) => {
        setItemModal(true)
        setPurchaseOrder({ ...purchaseOrder, 
            items: [
                ...purchaseOrder.items.map((item, i) => {
                    if (i === itemFocusIdx) return { ...item, name: e.target.value }
                    else return item
                })
            ] 
        })
    }
    const onPOItemQuantityChange = (e:any, idx?: number) => {
        if (idx) setItemFocusIdx(idx)
        idx = idx ? idx : itemFocusIdx
        setPurchaseOrder({ 
            ...purchaseOrder, items: [
                ...purchaseOrder.items.map((item, i) => {
                    if (i === idx) return { ...item, quantity: e.target.value }
                    else return item
                })
            ] 
        })
    }

    const deletePOItem = (idx: number, e: any) => {
        e.preventDefault()
        if (purchaseOrder.items.length === 1) return
        setPurchaseOrder({ 
            ...purchaseOrder, items: [
                ...purchaseOrder.items.filter((_, i) => i !== idx)
            ] 
        })
    }

    const selectItem = (id: string, name: string) => {
        setPurchaseOrder({ 
            ...purchaseOrder, items: [
                ...purchaseOrder.items.map((item, i) => {
                    if (i === itemFocusIdx) return { ...item, id, name }
                    else return item
                }),
                { id: '', name: '', quantity: 0, received: 0 }
            ] 
        })
        closeItemModal()
    }

    async function getPurchaseOrders() {
        const response = await getAllPurchaseOrders()

        if (response.isError) showToastError(response.message)
        else {
            setPurchaseOrders(response.data)
            setFilteredPOs(response.data)
        }
    }

    async function getPurchaseOrder(id: string) {
        const response = await getPurchaseOrderById(id)

        if (response.isError) showToastError(response.message)
        else setPurchaseOrder(response.data)
    }

    async function addPurchaseOrder(e: any) {
        e.preventDefault()

        let purchaseOrderCopy = { ...purchaseOrder }
        if (purchaseOrderCopy.items.at(-1)?.id === '') purchaseOrderCopy.items.pop()
    
        const response = await addNewPurchaseOrder(purchaseOrderCopy)

        if (response.isError) showToastError(response.message)
        else {
            showToastSuccess(response.message)
            e.target.reset()
            navigate('/purchase-order')
        }
    }

    async function updatePurchaseOrder(e: any) {
        e.preventDefault()

        const response = await updatePurchaseOrderById(purchaseOrder)

        if (response.isError) showToastError(response.message)
        else {
            showToastSuccess(response.message)
            navigate('/purchase-order')
        }
    }

    async function deletePurchaseOrder(id: string) {
        const response = await deletePurchaseOrderById(id)

        if (response.isError) showToastError(response.message)
        else {
            getPurchaseOrders()
            showToastSuccess(response.message)
        }
    }

    return { 
        filteredPOs, search, isAscending, sortType, itemFocusIdx, purchaseOrder, supplierModal, itemModal, sortBy, onSearchChange,
        closeSupplierModal, closeItemModal, selectSupplier, selectItem, deletePOItem, onFocusItem,
        onPOIdChange, onPOSupplierIdChange, onPOSupplierNameChange, onPOExpectedDeliveryDateChange, onPOCreatedAtChange, onPOItemIdChange, onPOItemNameChange, onPOItemQuantityChange, 
        getPurchaseOrders, addPurchaseOrder, deletePurchaseOrder, getPurchaseOrder, updatePurchaseOrder
    }
}

export default usePurchaseOrders