import TextField from "../../components/fields/TextField"
import BackButton from "../../components/buttons/BackButton"
import TextButton from "../../components/buttons/TextButton"
import { useParams } from "react-router"
import { useEffect } from "react"
import useSuppliers from "../../hooks/useSuppliers"

function SupplierUpdate() {
    const { supplier, onSupplierIdChange, onSupplierNameChange, onSupplierEmailChange, onSupplierPhoneChange, onSupplierAddressChange, editSupplier, getSupplier } = useSuppliers()
    const { id } = useParams()

    useEffect(() => {
        getSupplier(id as string)
    }, [ id ])

    return ( supplier && 
    <div className={`max-w-480 w-screen min-h-screen h-full flex flex-col gap-y-4 px-16 py-10`}>
        <BackButton redirectPath='/supplier' />  
        <form id='supplier-add-form' 
            onSubmit={(e) => editSupplier(e)} 
            className={`w-full h-full flex flex-col gap-y-5`}
        >
            <h1 className={`text-lg font-bold`}>Edit Supplier { supplier.id }</h1>
            <div className={`grid grid-cols-[320px_1fr] gap-x-4`}>
                <div className={`flex flex-col gap-y-4`}>
                    <TextField title='Kode Supplier' type='text' id='id' value={supplier.id} onChange={onSupplierIdChange}/>
                    <TextField title='Nomor Telepon' type='text' id='phone' value={supplier.phone} onChange={onSupplierPhoneChange}/>
                    <TextField title='Email' type='email' id='email' value={supplier.email} onChange={onSupplierEmailChange}/>
                </div>
                <div className={`flex flex-col gap-y-4`}>
                    <TextField title='Nama Supplier' type='text' id='name' value={supplier.name} onChange={onSupplierNameChange}/>
                    <TextField title='Alamat' type='text' id='address' value={supplier.address} onChange={onSupplierAddressChange}/>
                </div>
            </div>
            <div className={`h-full flex justify-end items-end`}>
                <TextButton text='Update' type='submit'/>
            </div>
        </form>
    </div>   
)}

export default SupplierUpdate