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
    createdAt: Date
}