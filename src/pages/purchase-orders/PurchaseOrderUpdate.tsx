import TextField from "../../components/fields/TextField"
import BackButton from "../../components/buttons/BackButton"
import useSuppliers from "../../hooks/useSuppliers"
import useItems from "../../hooks/useItems"
import { useEffect } from "react"
import PopUp from "../../components/popup/PopUp"
import usePurchaseOrders from "../../hooks/usePurchaseOrders"
import TextButton from "../../components/buttons/TextButton"
import InputItemTable from "../../components/tables/InputItemTable"
import { useParams } from "react-router"

function PurchaseOrderUpdate() {
    const { id } = useParams()
    const { items, getItems } = useItems()
    const { suppliers, getSuppliers } = useSuppliers()
    const { updatePurchaseOrder, getPurchaseOrder, onFocusItem, deletePOItem, onPOItemQuantityChange, selectItem, onPOItemIdChange, onPOItemNameChange, itemFocusIdx, purchaseOrder, supplierModal, itemModal, closeSupplierModal, closeItemModal, onPOIdChange, onPOCreatedAtChange, onPOExpectedDeliveryDateChange, onPOSupplierIdChange, onPOSupplierNameChange, selectSupplier } = usePurchaseOrders()

    useEffect(() => {
        getItems()
        getSuppliers()
    }, [])

    useEffect(() => {
        getPurchaseOrder(id as string)
    }, [ id ])

    return ( purchaseOrder &&
    <div className={`max-w-480 w-screen min-h-screen h-full flex flex-col gap-y-4 px-16 py-10 relative`}>
        { supplierModal && <PopUp search='Supplier' data={suppliers} close={closeSupplierModal} searchId={purchaseOrder.supplier.id} searchName={purchaseOrder.supplier.name} onSearchIdChange={onPOSupplierIdChange} onSearchNameChange={onPOSupplierNameChange} onSelect={selectSupplier} /> }
        { itemModal && <PopUp search='Barang' data={items} close={closeItemModal} searchId={purchaseOrder.items[itemFocusIdx].id} searchName={purchaseOrder.items[itemFocusIdx].name} onSearchIdChange={onPOItemIdChange} onSearchNameChange={onPOItemNameChange} onSelect={selectItem} /> }

        <BackButton redirectPath='/purchase-order' />  
        <form id='supplier-update-form' 
            onSubmit={(e) => updatePurchaseOrder(e)} 
            className={`w-full h-full flex flex-col gap-y-5 relative`}
        >
            <div className={`absolute -top-5 right-0`}>
                <TextButton text='Edit' type='submit'/>
            </div>
            <h1 className={`text-lg font-bold`}>Edit Purchase Order { id }</h1>
            <div className={`grid grid-cols-4 gap-x-4 gap-y-4`}>
                <TextField title='Kode PO' type='text' id='id' value={purchaseOrder.id} onChange={onPOIdChange}/>
                <TextField title='Tanggal PO' type='date' id='createdAt' value={purchaseOrder.createdAt.toISOString().split('T')[0]} onChange={onPOCreatedAtChange}/> 
                <TextField title='Tanggal Pengiriman' type='date' id='expectedDeliveryDate' value={purchaseOrder.expectedDeliveryDate.toISOString().split('T')[0]} onChange={onPOExpectedDeliveryDateChange} /> 
                <div className={`col-span-1`} />
                <TextField title='Kode Supplier' type='text' id='id' onChange={onPOSupplierIdChange} value={purchaseOrder.supplier.id}/>
                <div className={`col-span-3`}>
                    <TextField title='Nama Supplier' type='text' id='name' onChange={onPOSupplierNameChange} value={purchaseOrder.supplier.name}/>
                </div>
            </div>

            <div className={`w-full shadow-xs border border-gray-300 rounded-md`}>
                <InputItemTable
                    items={purchaseOrder.items}
                    deleteItem={deletePOItem}
                    onItemQuantityChange={onPOItemQuantityChange}
                    onItemIdChange={onPOItemIdChange}
                    onItemNameChange={onPOItemNameChange}
                    onFocus={onFocusItem}
                />
            </div>
        </form>
    </div>   
)}

export default PurchaseOrderUpdate