import { Route, Routes } from "react-router"
import IndexLayout from "./layouts/IndexLayout"
import ItemList from "./pages/items/ItemList"
import ItemAdd from "./pages/items/ItemAdd"
import { _ToastContainer } from "./components/toasts/Toast"
import ItemUpdate from "./pages/items/ItemUpdate"
import SupplierList from "./pages/suppliers/SupplierList"
import SupplierAdd from "./pages/suppliers/SupplierAdd"
import SupplierUpdate from "./pages/suppliers/SupplierUpdate"
import PurchaseOrderList from "./pages/purchase-orders/PurchaseOrderList"
import PurchaseOrderAdd from "./pages/purchase-orders/PurchaseOrderAdd"
import PurchaseOrderUpdate from "./pages/purchase-orders/PurchaseOrderUpdate"
import ReceivedItemList from "./pages/receive-items/ReceivedItemList"
import ReceivedItemAdd from "./pages/receive-items/ReceivedItemAdd"
import ReceivedItemUpdate from "./pages/receive-items/ReceivedItemUpdate"
import CustomerList from "./pages/customers/CustomerList"
import CustomerAdd from "./pages/customers/CustomerAdd"
import CustomerUpdate from "./pages/customers/CustomerUpdate"

function App() {
  return (
    <>
    <Routes>

      <Route path="/" element={<IndexLayout />}>
        <Route index element={<h1>Home</h1>} />
        <Route path='/barang' element={<ItemList />} />
        <Route path='/supplier' element={<SupplierList />} />
        <Route path='/customer' element={<CustomerList />} />
        <Route path='/purchase-order' element={<PurchaseOrderList />} />
        <Route path='/penerimaan-barang' element={<ReceivedItemList />} />
      </Route>

      <Route path='/barang/tambah' element={<ItemAdd />}/>
      <Route path='/barang/edit/:id' element={<ItemUpdate />}/>
      <Route path='/supplier/tambah' element={<SupplierAdd />} />
      <Route path='/supplier/edit/:id' element={<SupplierUpdate />} />
      <Route path='/customer/tambah' element={<CustomerAdd />} />
      <Route path='/customer/edit/:id' element={<CustomerUpdate />} />
      <Route path='/purchase-order/tambah' element={<PurchaseOrderAdd />} />
      <Route path='/purchase-order/edit/:id' element={<PurchaseOrderUpdate />} />
      <Route path='/penerimaan-barang/tambah' element={<ReceivedItemAdd />} />
      <Route path='/penerimaan-barang/edit/:id' element={<ReceivedItemUpdate />} />

    </Routes>
    <_ToastContainer />
  </>
)}

export default App