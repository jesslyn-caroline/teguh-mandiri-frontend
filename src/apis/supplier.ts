import axios from "axios";
import type { SupplierType } from "../types/SupplierType";
import { api } from ".";

async function getAllSuppliers():
    Promise<{ isError:boolean, message:string, data:SupplierType[] }> {
    
    let data:SupplierType[] = []
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.get(`${api}/suppliers`)
        data = response.data.data
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { isError, message, data }
}

async function getSupplierById(id: string):
    Promise<{ isError:boolean, message:string, data:SupplierType }> {
    
    let data: SupplierType = {} as SupplierType
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.get(`${api}/suppliers/${id}`)
        data = response.data.data
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { isError, message, data }
}

async function addNewSupplier(supplier:SupplierType):
    Promise<{ message:string, isError:boolean }> {
    
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.post(`${api}/suppliers`, supplier)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { message, isError }
}

async function updateSupplierById(supplier:SupplierType):
    Promise<{ message:string, isError:boolean }> {
    
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.put(`${api}/suppliers/${supplier.id}`, supplier)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { message, isError }
}

async function deleteSupplierById(id:string):
    Promise<{ isError:boolean, message:string }> {
    
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.delete(`${api}/suppliers/${id}`)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { isError, message }
}

export { getAllSuppliers, getSupplierById, addNewSupplier, updateSupplierById, deleteSupplierById }