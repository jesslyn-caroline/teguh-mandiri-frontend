export interface ReceivedItemType {
    id: string,
    purchaseId: string, 
    supplier: { id: string, name: string }
    items: { id: string, name: string, quantity: number }[]
    deliveryDate: Date
}

export const receivedItemDefaultValue: ReceivedItemType = {
    id: '', 
    purchaseId: '', 
    supplier: { id: '', name: '' }, 
    items: [
        { id: '', name: '', quantity: 0 }
    ], 
    deliveryDate: new Date()
}