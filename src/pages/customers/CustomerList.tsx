import { useEffect } from "react"
import { RiAddLine } from "@remixicon/react"
import { useNavigate } from "react-router"
import SearchInput from "../../components/fields/SearchInput"
import IconTextButton from "../../components/buttons/IconTextButton"
import useCustomers from "../../hooks/useCustomers"
import CustomerTable from "../../components/tables/CustomerTable"

function CustomerList() {
    const navigate = useNavigate()
    const { 
        sortType, isAscending, filtered, search,
        onSearchChange,
        sortBy,   
        getCustomers, deleteCustomer 
    } = useCustomers()

    useEffect(() => {
        getCustomers()
    }, [])

    return (
    <div className={`w-full flex flex-col items-end gap-y-5 px-5 py-15`}>
        <div className={`w-full flex flex-row items-center gap-x-3`}>
            <SearchInput placeholder='Cari Customer' value={search} onChange={onSearchChange} />
            <IconTextButton Icon={RiAddLine} title='Tambah Customer' text='Tambah' onClick={() => navigate('/customer/tambah')} />
        </div>
        
        <div className={`w-full overflow-x-auto shadow-xs border border-gray-300 rounded-md`}>
            <CustomerTable 
                customers={filtered} 
                sortBy={sortBy}
                isAscending={isAscending}
                sortType={sortType}
                editCustomer={(id) => navigate(`/customer/edit/${id}`)}
                deleteCustomer={deleteCustomer}
                action={true}
            />
        </div>
    </div>
)}

export default CustomerList