import { Route, Routes } from "react-router"
import IndexLayout from "./layouts/IndexLayout"
import ItemList from "./pages/items/ItemList"
import ItemAdd from "./pages/items/ItemAdd"
import { _ToastContainer } from "./components/toasts/Toast"
import ItemUpdate from "./pages/items/ItemUpdate"
import SupplierList from "./pages/suppliers/SupplierList"
import SupplierAdd from "./pages/suppliers/SupplierAdd"
import SupplierUpdate from "./pages/suppliers/SupplierUpdate"

function App() {
  return (
    <>
    <Routes>

      <Route path="/" element={<IndexLayout />}>
        <Route index element={<h1>Home</h1>} />
        <Route path='/barang' element={<ItemList />} />
        <Route path='/supplier' element={<SupplierList />} />
        <Route path='/purchase-order' element={<h1>Purchase Order</h1>} />
        <Route path='/history-barang' element={<h1>History Barang</h1>} />
      </Route>

      <Route path='/barang/tambah' element={<ItemAdd />}/>
      <Route path='/barang/edit/:id' element={<ItemUpdate />}/>
      <Route path='/supplier/tambah' element={<SupplierAdd />} />
      <Route path='/supplier/edit/:id' element={<SupplierUpdate />} />

    </Routes>
    <_ToastContainer />
  </>
)}

export default App