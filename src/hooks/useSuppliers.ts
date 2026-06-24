import { useState } from "react"
import type { SupplierType } from "../types/SupplierType"
import { addNewSupplier, deleteSupplierById, getAllSuppliers, getSupplierById, updateSupplierById } from "../apis/supplier"
import { showToastError, showToastSuccess } from "../components/toasts/Toast"
import { useNavigate } from "react-router"

function useSuppliers() {
    const navigate = useNavigate()

    // States
    const [suppliers, setSuppliers] = useState<SupplierType[]>([])
    const [supplier, setSupplier] = useState<SupplierType>({ id: '', name: '', phone: '', email: '', address: '' })

    const [search, setSearch] = useState<string>('')
    const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierType[]>([])
    const [sortType, setSortType] = useState<string>('')
    const [isAscending, setIsAscending] = useState<boolean>(true)

    // Controllers
    const onSearchChange = (e:any) => {
        setSearch(e.target.value)
        setFilteredSuppliers(suppliers.filter((supplier) => 
            supplier.name.toLowerCase().includes(e.target.value.toLowerCase()) || 
            supplier.id.toLowerCase().includes(e.target.value.toLowerCase()
        )))
    }

    const onSupplierIdChange = (e:any) => setSupplier({ ...supplier, id: e.target.value })
    const onSupplierNameChange = (e:any) => setSupplier({ ...supplier, name: e.target.value })
    const onSupplierPhoneChange = (e:any) => setSupplier({ ...supplier, phone: e.target.value })
    const onSupplierEmailChange = (e:any) => setSupplier({ ...supplier, email: e.target.value })
    const onSupplierAddressChange = (e:any) => setSupplier({ ...supplier, address: e.target.value })

    // Functions
    const sortBy = (type: string) => {
        let tmp = suppliers

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

        setSuppliers(tmp)
    }

    // API
    async function getSuppliers() {
        const response = await getAllSuppliers()
        
        if (response.isError) showToastError(response.message)
        else {
            setSuppliers(response.data)
            setFilteredSuppliers(response.data)
        }
    }

    async function getSupplier(id: string) {
        const response = await getSupplierById(id)

        if (response.isError) showToastError(response.message)
        else setSupplier(response.data)
    }

    async function addSupplier(e: any) {
        e.preventDefault()

        const response = await addNewSupplier(supplier)
        
        if (response.isError) showToastError(response.message)
        else {
            showToastSuccess(response.message)
            e.target.reset()
            navigate('/supplier')
        }
    } 

    async function editSupplier(e: any) {
        e.preventDefault()

        const response = await updateSupplierById(supplier)
        
        if (response.isError) showToastError(response.message)
        else {
            showToastSuccess(response.message)
            navigate('/supplier')
        }
    }

    async function deleteSupplier(id:string) {
        const response = await deleteSupplierById(id)
        
        if (response.isError) showToastError(response.message)
        else {
            getSuppliers()
            showToastSuccess(response.message)
        }
    }

    return { 
        suppliers, supplier, sortBy, sortType, filteredSuppliers, search, isAscending,
        onSearchChange, onSupplierIdChange, onSupplierNameChange, onSupplierPhoneChange, onSupplierEmailChange, onSupplierAddressChange,
        getSuppliers, getSupplier, addSupplier, editSupplier, deleteSupplier 
    }
}

export default useSuppliers