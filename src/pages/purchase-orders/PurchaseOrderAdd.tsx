import TextField from "../../components/fields/TextField"
import BackButton from "../../components/buttons/BackButton"
import useSuppliers from "../../hooks/useSuppliers"
import useItems from "../../hooks/useItems"
import { useEffect } from "react"
import PopUp from "../../components/popup/PopUp"
import TextButton from "../../components/buttons/TextButton"
import InputItemTable from "../../components/tables/InputItemTable"
import usePurchaseOrders from "../../hooks/usePurchaseOrders"

function PurchaseOrderAdd() {
    const { items, getItems } = useItems()
    const { suppliers, getSuppliers } = useSuppliers()
    const { 
        order, itemFocusIdx, supplierModal, itemModal,
        onFocusItem, onItemQuantityChange, onItemIdChange, onItemNameChange, onIdChange, onCreatedAtChange, onExpectedDeliveryDateChange, onSupplierIdChange, onSupplierNameChange,
        addNewRow,  deleteItemFromList,  selectItem, closeSupplierModal, closeItemModal, selectSupplier,
        addOrder, 
    } = usePurchaseOrders()

    useEffect(() => {
        getItems()
        getSuppliers()
    }, [])

    return (
    <div className={`max-w-480 w-screen min-h-screen h-full flex flex-col gap-y-4 px-16 py-10 relative`}>
        { supplierModal && 
            <PopUp 
                search='Supplier' data={suppliers} close={closeSupplierModal} 
                searchId={order.supplier.id} searchName={order.supplier.name} 
                onSearchIdChange={onSupplierIdChange} onSearchNameChange={onSupplierNameChange} onSelect={selectSupplier}
            /> 
        } { itemModal && 
            <PopUp 
                search='Barang' data={items} close={closeItemModal} 
                searchId={order.items[itemFocusIdx.current].id} searchName={order.items[itemFocusIdx.current].name} 
                onSearchIdChange={onItemIdChange} onSearchNameChange={onItemNameChange} onSelect={selectItem} 
            /> 
        }

        <BackButton redirectPath='/purchase-order' />  
        <form id='purchase-order-add-form' 
            onSubmit={(e) => addOrder(e)} 
            className={`w-full h-full flex flex-col gap-y-5 relative`}
        >
            <div className={`absolute -top-5 right-0`}>
                <TextButton text='Tambah' type='submit'/>
            </div>
            <h1 className={`text-lg font-bold`}>Buat Purchase Order Baru</h1>
            <div className={`grid grid-cols-4 gap-x-4 gap-y-4`}>
                <TextField title='Kode PO' type='text' id='id' value={order.id} onChange={onIdChange}/>
                <TextField title='Tanggal PO' type='date' id='createdAt' value={order.createdAt.toISOString().split('T')[0]} onChange={onCreatedAtChange}/>
                <TextField title='Tanggal Pengiriman' type='date' id='expectedDeliveryDate' value={order.expectedDeliveryDate.toISOString().split('T')[0]} onChange={onExpectedDeliveryDateChange} />
                <div className={`col-span-1`} />
                <TextField title='Kode Supplier' type='text' id='id' onChange={onSupplierIdChange} value={order.supplier.id}/>
                <div className={`col-span-3`}>
                    <TextField title='Nama Supplier' type='text' id='name' onChange={onSupplierNameChange} value={order.supplier.name}/>
                </div>
            </div>

            <div className={`w-full shadow-xs border border-gray-300 rounded-md`}>
                <InputItemTable
                    items={order.items}
                    deleteItem={deleteItemFromList}
                    onItemQuantityChange={onItemQuantityChange}
                    onItemIdChange={onItemIdChange}
                    onItemNameChange={onItemNameChange}
                    onFocus={onFocusItem}
                    addNewRow={addNewRow}
                />
            </div>
        </form>
    </div>   
)}

export default PurchaseOrderAdd