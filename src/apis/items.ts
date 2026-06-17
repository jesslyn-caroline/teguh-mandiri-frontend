import axios from "axios"
import type { ItemType } from "../types/ItemType"
import { api } from "."

async function getAllItems():
    Promise<{ isError:boolean, message:string, data:ItemType[] }> {

    let data:ItemType[] = []
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.get(`${api}/items`)
        data = response.data.data
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { isError, message, data }
}

async function getItemById(id: string):
    Promise<{ isError:boolean, message:string, data:ItemType }> {
    
    let data: ItemType = {} as ItemType
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.get(`${api}/items/${id}`)
        data = response.data.data
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { isError, message, data }
}

async function addNewItem(item:ItemType):
    Promise<{ message:string, isError:boolean }> {

    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.post(`${api}/items`, item)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { message, isError }
}

async function updateItemById(item:ItemType):
    Promise<{ message:string, isError:boolean }> {

    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.put(`${api}/items/${item.id}`, item)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { message, isError }
}

async function deleteItemById(id:string):
    Promise<{ isError:boolean, message:string }> {
    
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.delete(`${api}/items/${id}`)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { isError, message }
}

export { getAllItems, getItemById, addNewItem, updateItemById, deleteItemById }