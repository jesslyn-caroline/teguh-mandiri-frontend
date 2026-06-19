import { RiCloseLargeLine } from "@remixicon/react"
import SearchInput from "../fields/SearchInput"
import type { SupplierType } from "../../types/SupplierType"
import type { ItemType } from "../../types/ItemType"
import SupplierTable from "../tables/SupplierTable"
import ItemTable from "../tables/ItemTable"

interface Props {
    search: string,
    data: SupplierType[] | ItemType[],
    close: () => void,
    searchId: string,
    searchName: string,
    onSearchIdChange: (e: any) => void,
    onSearchNameChange: (e: any) => void,
    onSelect: (id: string, name: string) => void
}

function PopUp({ search, data, close, searchId, searchName, onSearchIdChange, onSearchNameChange, onSelect }: Props) {
    return (
    <div className={`absolute top-0 left-0 w-full h-full bg-black/40 px-32 py-8 z-10`}>
        <div className={`w-full h-full flex flex-col gap-y-4 bg-white rounded-lg p-8`}>
            <RiCloseLargeLine className={`size-5`} onClick={close} />
            <div className={`flex flex-row gap-x-5`}>
                <SearchInput placeholder={`Cari Kode ${search}`} value={searchId} onChange={onSearchIdChange} autofocus/>
                <SearchInput placeholder={`Cari Nama ${search}`} value={searchName} onChange={onSearchNameChange} />
            </div>
            
            <div className={`w-full overflow-x-auto shadow-xs border border-gray-300 rounded-md`}>
                {
                    search === 'Supplier' ?
                    <SupplierTable
                        suppliers={data.filter((value) => value.id.includes(searchId) && value.name.includes(searchName)) as SupplierType[]} 
                        action={false}
                        needAddress={false}
                        needEmail={false}
                        needPhone={false}
                        onRowSelect={onSelect}
                    /> : 
                    <ItemTable 
                        items={data.filter((value) => value.id.includes(searchId) && value.name.includes(searchName)) as ItemType[]} 
                        action={false}
                        onRowSelect={onSelect}
                    />
                }
            </div>
        </div>
    </div>    
)}

export default PopUp