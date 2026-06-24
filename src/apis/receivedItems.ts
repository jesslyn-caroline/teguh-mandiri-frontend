import axios from "axios";
import type { ReceivedItemType } from "../types/ReceivedItemType";
import { api } from ".";

async function getAllReceivedItems(): 
    Promise<{ message: string, isError: boolean, data: ReceivedItemType[] }> {
    
    let message: string = ''
    let isError: boolean = false
    let data: ReceivedItemType[] = []

    try {
        const response = await axios.get(`${api}/procurement/deliveries`)
        message = response.data.message
        data = response.data.data
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }
    
    return { message, isError, data }
}

async function getReceivedItemById(id: string): 
    Promise<{ message: string, isError: boolean, data: ReceivedItemType }> {
    
    let message: string = ''
    let isError: boolean = false
    let data: ReceivedItemType = {} as ReceivedItemType

    try {
        const response = await axios.get(`${api}/procurement/deliveries/${id}`)
        message = response.data.message
        data = response.data.data
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    data = { ...data, deliveryDate: new Date(data.deliveryDate) }
    
    return { message, isError, data }
}

async function addNewReceivedItem(receivedItem: ReceivedItemType): 
    Promise<{ message: string, isError: boolean }> {
    
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.post(`${api}/procurement/deliveries`, receivedItem)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }
    
    return { message, isError }
}

async function updateReceivedItemById(receivedItem: ReceivedItemType): 
    Promise<{ message: string, isError: boolean }> {
    
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.put(`${api}/procurement/deliveries/${receivedItem.id}`, receivedItem)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }
    
    return { message, isError }
}

async function deleteReceivedItemById(id: string): 
    Promise<{ message: string, isError: boolean }> {
    
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.delete(`${api}/procurement/deliveries/${id}`)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }
    
    return { message, isError }
}

export { getAllReceivedItems, getReceivedItemById, addNewReceivedItem, updateReceivedItemById, deleteReceivedItemById }