import { Route, Routes } from "react-router"
import IndexLayout from "./layouts/IndexLayout"

function App() {
  return (
  <Routes>
    <Route path="/" element={<IndexLayout />}>
      <Route index element={<h1>Home</h1>} />
      <Route path='/barang' element={<h1>Barang</h1>} />
      <Route path='/supplier' element={<h1>Supplier</h1>} />
      <Route path='/purchase-order' element={<h1>Purchase Order</h1>} />
      <Route path='/history-barang' element={<h1>History Barang</h1>} />
    </Route>
  </Routes>
)}

export default App