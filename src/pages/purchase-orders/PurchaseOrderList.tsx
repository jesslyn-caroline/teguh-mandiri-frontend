import { useEffect } from "react"
import { RiAddLine } from "@remixicon/react"
import { useNavigate } from "react-router"
import SearchInput from "../../components/fields/SearchInput"
import IconTextButton from "../../components/buttons/IconTextButton"
import usePurchaseOrders from "../../hooks/usePurchaseOrders"
import PurchaseOrderTable from "../../components/tables/PurchaseOrderTable"

function PurchaseOrderList() {
    const navigate = useNavigate()
    const { 
        filtered, search, sortType, isAscending,
        onSearchChange, 
        sortBy,
        getOrders, deleteOrder 
    } = usePurchaseOrders()

    useEffect(() => {
        getOrders()
    }, [])

    return (
    <div className={`w-full flex flex-col items-end gap-y-5 px-5 py-15`}>
        <div className={`w-full flex flex-row items-center gap-x-3`}>
            <SearchInput placeholder='Cari PO' value={search} onChange={onSearchChange} />
            <IconTextButton Icon={RiAddLine} title='Buat PO' text='Tambah' onClick={() => navigate('/purchase-order/tambah')} />
        </div>
        
        <div className={`w-full overflow-x-auto shadow-xs border border-gray-300 rounded-md`}>
            <PurchaseOrderTable 
                purchaseOrders={filtered}
                sortBy={sortBy}
                isAscending={isAscending}
                sortType={sortType}
                editPurchaseOrder={(id) => navigate(`/purchase-order/edit/${id}`)}
                deletePurchaseOrder={deleteOrder}
                action={true}
            />
        </div>
    </div>
)}

export default PurchaseOrderList