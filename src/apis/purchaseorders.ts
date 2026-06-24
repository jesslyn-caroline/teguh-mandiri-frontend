import axios from "axios"
import type { PurchaseOrderType } from "../types/PurchaseOrderType"
import { api } from "."

async function getAllPurchaseOrders(isCompleted?: boolean):
    Promise<{ message:string, data:PurchaseOrderType[], isError:boolean }> {
    
    let message: string = ''
    let data: PurchaseOrderType[] = []
    let isError: boolean = false

    try {
        const response = await axios.get(`${api}/procurement/purchase-orders${isCompleted !== undefined ? `?isCompleted=${isCompleted}` : ''}`)
        message = response.data.message
        data = response.data.data
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { message, data, isError }
}

async function getPurchaseOrderById(id: string): 
    Promise<{ message:string, data:PurchaseOrderType, isError:boolean }> {
    
    let message: string = ''
    let data: PurchaseOrderType = {} as PurchaseOrderType
    let isError: boolean = false

    try {
        const response = await axios.get(`${api}/procurement/purchase-orders/${id}`)
        message = response.data.message
        data = response.data.data
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    data = { ...data, expectedDeliveryDate: new Date(data.expectedDeliveryDate), createdAt: new Date(data.createdAt) }

    return { message, data, isError }
}

async function addNewPurchaseOrder(purchaseOrder:PurchaseOrderType):
    Promise<{ message:string, isError:boolean }> {
    
    let message: string = ''
    let isError: boolean = false    

    try {
        const response = await axios.post(`${api}/procurement/purchase-orders`, purchaseOrder)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { message, isError }
}

async function updatePurchaseOrderById(purchaseOrder:PurchaseOrderType):
    Promise<{ message:string, isError:boolean }> {
    
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.put(`${api}/procurement/purchase-orders/${purchaseOrder.id}`, purchaseOrder)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { message, isError }
}

async function deletePurchaseOrderById(id: string): 
    Promise<{ message:string, isError:boolean }> {
    
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.delete(`${api}/procurement/purchase-orders/${id}`)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { message, isError }
}   

export { getAllPurchaseOrders, getPurchaseOrderById, addNewPurchaseOrder, updatePurchaseOrderById, deletePurchaseOrderById }