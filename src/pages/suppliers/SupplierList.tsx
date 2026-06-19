import { useEffect } from "react"
import { RiAddLine } from "@remixicon/react"
import { useNavigate } from "react-router"
import SearchInput from "../../components/fields/SearchInput"
import IconTextButton from "../../components/buttons/IconTextButton"
import useSuppliers from "../../hooks/useSuppliers"
import SupplierTable from "../../components/tables/SupplierTable"

function SupplierList() {
    const navigate = useNavigate()
    const { sortBy, sortType, isAscending, filteredSuppliers, search, onSearchChange, getSuppliers, deleteSupplier } = useSuppliers()

    useEffect(() => {
        getSuppliers()
    }, [])

    return (
    <div className={`w-full flex flex-col items-end gap-y-5 px-5 py-15`}>
        <div className={`w-full flex flex-row items-center gap-x-3`}>
            <SearchInput placeholder='Cari Supplier' value={search} onChange={onSearchChange} />
            <IconTextButton Icon={RiAddLine} title='Tambah Barang' text='Tambah' onClick={() => navigate('/supplier/tambah')} />
        </div>
        
        <div className={`w-full overflow-x-auto shadow-xs border border-gray-300 rounded-md`}>
            <SupplierTable 
                suppliers={filteredSuppliers}
                sortBy={sortBy}
                isAscending={isAscending}
                sortType={sortType}
                editSupplier={(id) => navigate(`/supplier/edit/${id}`)}
                deleteSupplier={deleteSupplier}
                action={true}
            />
        </div>
    </div>
)}

export default SupplierList