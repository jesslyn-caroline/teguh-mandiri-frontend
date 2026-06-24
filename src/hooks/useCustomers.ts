import { useState } from "react"
import type { CustomerType } from "../types/CustomerType"
import { showToastError, showToastSuccess } from "../components/toasts/Toast"
import { useNavigate } from "react-router"
import { getAllCustomers, getCustomerById, addNewCustomer, updateCustomerById, deleteCustomerById } from "../apis/customers"

function useCustomers() {
    const navigate = useNavigate()

    // States
    const [customers, setCustomers] = useState<CustomerType[]>([])
    const [customer, setCustomer] = useState<CustomerType>({ id: '', name: '', phone: '', email: '', address: '' })

    const [search, setSearch] = useState<string>('')
    const [filtered, setFiltered] = useState<CustomerType[]>([])
    const [sortType, setSortType] = useState<string>('')
    const [isAscending, setIsAscending] = useState<boolean>(true)

    // Controllers
    const onSearchChange = (e:any) => {
        setSearch(e.target.value)
        setFiltered(customers.filter((customer) => 
            customer.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
            customer.id.toLowerCase().includes(e.target.value.toLowerCase()
        )))
    }

    const onCustomerIdChange = (e:any) => setCustomer({ ...customer, id: e.target.value })
    const onCustomerNameChange = (e:any) => setCustomer({ ...customer, name: e.target.value })
    const onCustomerPhoneChange = (e:any) => setCustomer({ ...customer, phone: e.target.value })
    const onCustomerEmailChange = (e:any) => setCustomer({ ...customer, email: e.target.value })
    const onCustomerAddressChange = (e:any) => setCustomer({ ...customer, address: e.target.value })

    // Functions
    const sortBy = (type: string) => {
        let tmp = customers

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
            case 'phone':
                if (isAscending) tmp = tmp.sort((a, b) => b.phone.localeCompare(a.phone))
                else tmp = tmp.sort((a, b) => a.phone.localeCompare(b.phone))
                setIsAscending(!isAscending)
                setSortType(type)
                break
            case 'email':
                if (isAscending) tmp = tmp.sort((a, b) => b.email.localeCompare(a.email))
                else tmp = tmp.sort((a, b) => a.email.localeCompare(b.email))
                setIsAscending(!isAscending)
                setSortType(type)
                break
            case 'address':
                if (isAscending) tmp = tmp.sort((a, b) => b.address.localeCompare(a.address))
                else tmp = tmp.sort((a, b) => a.address.localeCompare(b.address))
                setIsAscending(!isAscending)
                setSortType(type)
                break
        }

        setCustomers(tmp)
    }

    // API
    async function getCustomers() {
        const response = await getAllCustomers()
        
        if (response.isError) showToastError(response.message)
        else {
            setCustomers(response.data)
            setFiltered(response.data)
        }
    }

    async function getCustomer(id: string) {
        const response = await getCustomerById(id)

        if (response.isError) showToastError(response.message)
        else setCustomer(response.data)
    }

    async function addCustomer(e: any) {
        e.preventDefault()

        const response = await addNewCustomer(customer)
        
        if (response.isError) showToastError(response.message)
        else {
            showToastSuccess(response.message)
            e.target.reset()
            navigate('/customer')
        }
    } 

    async function editCustomer(e: any) {
        e.preventDefault()

        const response = await updateCustomerById(customer)
        
        if (response.isError) showToastError(response.message)
        else {
            showToastSuccess(response.message)
            navigate('/customer')
        }
    }

    async function deleteCustomer(id:string) {
        const response = await deleteCustomerById(id)
        
        if (response.isError) showToastError(response.message)
        else {
            getCustomers()
            showToastSuccess(response.message)
        }
    }

    return { 
        customers, customer, sortBy, sortType, filtered, search, isAscending,
        onSearchChange, onCustomerIdChange, onCustomerNameChange, onCustomerPhoneChange, onCustomerEmailChange, onCustomerAddressChange,
        getCustomers, getCustomer, addCustomer, editCustomer, deleteCustomer 
    }
}

export default useCustomers