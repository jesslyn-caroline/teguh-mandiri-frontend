import axios from "axios";
import type { CustomerType } from "../types/CustomerType";
import { api } from ".";

async function getAllCustomers():
    Promise<{ isError:boolean, message:string, data:CustomerType[] }> {
    
    let data:CustomerType[] = []
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.get(`${api}/customers`)
        data = response.data.data
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { isError, message, data }
}

async function getCustomerById(id: string):
    Promise<{ isError:boolean, message:string, data:CustomerType }> {
    
    let data: CustomerType = {} as CustomerType
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.get(`${api}/customers/${id}`)
        data = response.data.data
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { isError, message, data }
}

async function addNewCustomer(supplier:CustomerType):
    Promise<{ message:string, isError:boolean }> {
    
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.post(`${api}/customers`, supplier)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { message, isError }
}

async function updateCustomerById(supplier:CustomerType):
    Promise<{ message:string, isError:boolean }> {
    
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.put(`${api}/customers/${supplier.id}`, supplier)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { message, isError }
}

async function deleteCustomerById(id:string):
    Promise<{ isError:boolean, message:string }> {
    
    let message: string = ''
    let isError: boolean = false

    try {
        const response = await axios.delete(`${api}/customers/${id}`)
        message = response.data.message
    } catch (error: any) {
        isError = true
        message = error.response.data.message
    }

    return { isError, message }
}

export { getAllCustomers, getCustomerById, addNewCustomer, updateCustomerById, deleteCustomerById }