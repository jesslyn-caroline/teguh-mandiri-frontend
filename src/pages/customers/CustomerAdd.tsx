import TextField from "../../components/fields/TextField"
import BackButton from "../../components/buttons/BackButton"
import TextButton from "../../components/buttons/TextButton"
import useCustomers from "../../hooks/useCustomers"

function CustomerAdd() {
    const { 
        onCustomerIdChange, onCustomerNameChange, onCustomerEmailChange, onCustomerPhoneChange, onCustomerAddressChange, 
        addCustomer 
    } = useCustomers()

    return (
    <div className={`max-w-480 w-screen min-h-screen h-full flex flex-col gap-y-4 px-16 py-10`}>
        <BackButton redirectPath='/customer' />  
        <form id='customer-add-form' 
            onSubmit={(e) => addCustomer(e)} 
            className={`w-full h-full flex flex-col gap-y-6`}
        >
            <h1 className={`text-lg font-bold`}>Tambah Customer Baru</h1>
            <div className={`grid grid-cols-4 gap-y-4 gap-x-4`}>
                <TextField title='Kode Customer' type='text' id='id' onChange={onCustomerIdChange}/>
                <div className={`col-span-3`}>
                    <TextField title='Nama Customer' type='text' id='name' onChange={onCustomerNameChange}/>
                </div>
                <TextField title='Nomor Telepon' type='text' id='phone' onChange={onCustomerPhoneChange}/>
                <TextField title='Email' type='email' id='email' onChange={onCustomerEmailChange}/>
                <TextField title='Alamat' type='text' id='address' onChange={onCustomerAddressChange}/>
            </div>
            <div className={`h-full flex justify-end items-end`}>
                <TextButton text='Tambah' type='submit'/>
            </div>
        </form>
    </div>   
)}

export default CustomerAdd