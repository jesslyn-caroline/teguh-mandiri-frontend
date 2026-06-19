import { useEffect } from "react"
import { RiAddLine } from "@remixicon/react"
import { useNavigate } from "react-router"
import useItems from "../../hooks/useItems"
import SearchInput from "../../components/fields/SearchInput"
import IconTextButton from "../../components/buttons/IconTextButton"
import ItemTable from "../../components/tables/ItemTable"

function ItemList() {
    const navigate = useNavigate()
    const { filteredItems, search, isAscending, sortType, onSearchChange, getItems, deleteItem, sortBy } = useItems()

    useEffect(() => {
        getItems()
    }, [])

    return (
    <div className={`w-full flex flex-col items-end gap-y-5 px-5 py-15`}>
        <div className={`w-full flex flex-row items-center gap-x-3`}>
            <SearchInput placeholder='Cari Barang' value={search} onChange={onSearchChange} />
            <IconTextButton Icon={RiAddLine} title='Tambah Barang' text='Tambah' onClick={() => navigate('/barang/tambah')} />
        </div>
        
        <div className={`w-full overflow-x-auto shadow-xs border border-gray-300 rounded-md`}>
            <ItemTable 
                items={filteredItems}
                sortBy={sortBy}
                isAscending={isAscending}
                sortType={sortType}
                editItem={(id) => navigate(`/barang/edit/${id}`)}
                deleteItem={deleteItem}
                action={true}
            />
        </div>
    </div>
)}

export default ItemList