export interface PurchaseOrderType {
    id: string,
    supplier: {
        id: string,
        name: string
    },
    items: {
        id: string,
        name: string,
        quantity: number,
        received: number
    }[],
    expectedDeliveryDate: Date,
    createdAt: Date,
    isCompleted: boolean
}

export const purchaseOrderDefaultValue:PurchaseOrderType = { 
    id: '', 
    supplier: { id: '', name: '' }, 
    expectedDeliveryDate: new Date(), 
    createdAt: new Date(), 
    items: [
        { id: '', name: '', quantity: 0, received: 0 }
    ],
    isCompleted: false
}