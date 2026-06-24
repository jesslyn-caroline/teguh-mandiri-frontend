import TextField from "../../components/fields/TextField"
import BackButton from "../../components/buttons/BackButton"
import TextButton from "../../components/buttons/TextButton"
import { useParams } from "react-router"
import { useEffect } from "react"
import useCustomers from "../../hooks/useCustomers"

function CustomerUpdate() {
    const { id } = useParams()

    const { 
        customer, 
        onCustomerIdChange, onCustomerNameChange, onCustomerEmailChange, onCustomerPhoneChange, onCustomerAddressChange, 
        editCustomer, getCustomer 
    } = useCustomers()

    useEffect(() => {
        getCustomer(id as string)
    }, [ id ])

    return ( customer && 
    <div className={`max-w-480 w-screen min-h-screen h-full flex flex-col gap-y-4 px-16 py-10`}>
        <BackButton redirectPath='/customer' />  
        <form id='customer-edit-form' 
            onSubmit={(e) => editCustomer(e)} 
            className={`w-full h-full flex flex-col gap-y-5`}
        >
            <h1 className={`text-lg font-bold`}>Edit Customer { customer.id }</h1>
            <div className={`grid grid-cols-[320px_1fr] gap-x-4`}>
                <div className={`flex flex-col gap-y-4`}>
                    <TextField title='Kode Customer' type='text' id='id' value={customer.id} onChange={onCustomerIdChange}/>
                    <TextField title='Nomor Telepon' type='text' id='phone' value={customer.phone} onChange={onCustomerPhoneChange}/>
                    <TextField title='Email' type='email' id='email' value={customer.email} onChange={onCustomerEmailChange}/>
                </div>
                <div className={`flex flex-col gap-y-4`}>
                    <TextField title='Nama Customer' type='text' id='name' value={customer.name} onChange={onCustomerNameChange}/>
                    <TextField title='Alamat' type='text' id='address' value={customer.address} onChange={onCustomerAddressChange}/>
                </div>
            </div>
            <div className={`h-full flex justify-end items-end`}>
                <TextButton text='Update' type='submit'/>
            </div>
        </form>
    </div>   
)}

export default CustomerUpdate