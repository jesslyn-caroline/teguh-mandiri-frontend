interface ItemProps { 
    id: string, 
    name: string, 
    quantity: number 
}

function createItemRecord(items: ItemProps[]) {
    const itemQty: Record<string, number> = {}
    const itemName: Record<string, string> = {}

    for (let i = 0; i < items.length; i++) {
        if (!itemQty[items[i].id]) itemQty[items[i].id] = 0
        itemQty[items[i].id] += items[i].quantity
        itemName[items[i].id] = items[i].name
    }

    return { itemQty, itemName }
}

export default createItemRecord