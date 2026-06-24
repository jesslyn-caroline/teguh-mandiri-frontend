import TextField from "../../components/fields/TextField"
import BackButton from "../../components/buttons/BackButton"
import { useEffect } from "react"
import usePurchaseOrders from "../../hooks/usePurchaseOrders"
import TextButton from "../../components/buttons/TextButton"
import InputItemTable from "../../components/tables/InputItemTable"
import useReceivedItems from "../../hooks/useReceivedItems"
import PurchaseOrderPopUp from "../../components/popup/PurchaseOrderPopUp"
import UncompletedItemPopUp from "../../components/popup/UncompletedItemPopUp"
import { useParams } from "react-router"

function ReceivedItemUpdate() {
    const { id } = useParams()
    const { filtered, getOrders } = usePurchaseOrders()

    const { 
        receivedItem, itemFocusIdx, uncompletedItemList, itemModal, purchaseOrderModal,
        onPurchaseIdChange, onSupplierNameChange, selectPurchaseOrder, onIdChange, onDeliveryDateChange,onItemIdChange, onItemNameChange, onItemQuantityChange, onFocusItem,
        addNewRow, selectItem, closePurchaseOrderModal, closeItemModal, deleteItemFromList,
        getReceivedItem, updateReceivedItem
    } = useReceivedItems()

    useEffect(() => {
        getOrders(false)
    }, [])

    useEffect(() => {
        getReceivedItem(id as string)
    }, [ id ])

    return ( receivedItem &&
    <div className={`max-w-480 w-screen min-h-screen h-full flex flex-col gap-y-4 px-16 py-10 relative`}>
        { purchaseOrderModal && <PurchaseOrderPopUp search='Purchase Order' data={filtered} close={closePurchaseOrderModal} searchId={receivedItem.purchaseId} searchName={receivedItem.supplier.name} onSearchIdChange={onPurchaseIdChange} onSearchNameChange={onSupplierNameChange} onSelect={selectPurchaseOrder} /> }
        { itemModal && <UncompletedItemPopUp search='Barang' data={uncompletedItemList} close={closeItemModal} searchId={receivedItem.items[itemFocusIdx.current].id} searchName={receivedItem.items[itemFocusIdx.current].name} onSearchIdChange={onItemIdChange} onSearchNameChange={onItemNameChange} onSelect={selectItem} /> }

        <BackButton redirectPath='/penerimaan-barang' />  
        <form id='supplier-add-form' 
            onSubmit={(e) => updateReceivedItem(e)} 
            className={`w-full h-full flex flex-col gap-y-5 relative`}
        >
            <div className={`absolute -top-5 right-0`}>
                <TextButton text='Tambah' type='submit'/>
            </div>
            <h1 className={`text-lg font-bold`}>Edit Penerimaan Barang { id }</h1>
            <div className={`grid grid-cols-4 gap-x-4 gap-y-4`}>
                <TextField title='Kode Penerimaan Barang' type='text' id='id' value={receivedItem.id} onChange={onIdChange}/>
                <TextField title='Kode PO' type='text' id='purchaseId' value={receivedItem.purchaseId} onChange={onPurchaseIdChange}/>
                <TextField title='Tanggal Penerimaan' type='date' id='expectedDeliveryDate' value={receivedItem.deliveryDate.toISOString().split('T')[0]} onChange={onDeliveryDateChange} />
                <div className={`col-span-1`} />
                <TextField title='Kode Supplier' type='text' id='id' value={receivedItem.supplier.id} disabled={true}/>
                <div className={`col-span-3`}>
                    <TextField title='Nama Supplier' type='text' id='name' value={receivedItem.supplier.name} disabled={true}/>
                </div>
            </div>

            <div className={`w-full shadow-xs border border-gray-300 rounded-md`}>
                <InputItemTable
                    items={receivedItem.items}
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

export default ReceivedItemUpdate