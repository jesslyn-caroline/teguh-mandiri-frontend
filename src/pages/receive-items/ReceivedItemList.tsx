import { useEffect } from "react"
import { RiAddLine } from "@remixicon/react"
import { useNavigate } from "react-router"
import SearchInput from "../../components/fields/SearchInput"
import IconTextButton from "../../components/buttons/IconTextButton"
import ReceivedItemTable from "../../components/tables/ReceivedItemTable"
import useReceivedItems from "../../hooks/useReceivedItems"

function ReceivedItemList() {
    const navigate = useNavigate()
    const { 
        filtered, search, sortType, isAscending, 
        onSearchChange,  
        sortBy,
        getReceivedItems, deleteReceivedItem 
    } = useReceivedItems()

    useEffect(() => {
        getReceivedItems()
    }, [])

    return (
    <div className={`w-full flex flex-col items-end gap-y-5 px-5 py-15`}>
        <div className={`w-full flex flex-row items-center gap-x-3`}>
            <SearchInput placeholder='Cari Penerimaan Barang' value={search} onChange={onSearchChange} />
            <IconTextButton Icon={RiAddLine} title='Buat RI' text='Tambah' onClick={() => navigate('/penerimaan-barang/tambah')} />
        </div>
        
        <div className={`w-full overflow-x-auto shadow-xs border border-gray-300 rounded-md`}>
            <ReceivedItemTable
                receivedItems={filtered}
                sortBy={sortBy}
                isAscending={isAscending}
                sortType={sortType}
                editReceivedItem={(id) => navigate(`/penerimaan-barang/edit/${id}`)}
                deleteReceivedItem={deleteReceivedItem}
                action={true}
            />
        </div>
    </div>
)}

export default ReceivedItemList