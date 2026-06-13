import { Route, Routes } from "react-router"
import IndexLayout from "./layouts/IndexLayout"

function App() {
  return (
  <Routes>
    <Route path="/" element={<IndexLayout />}>
      <Route index element={<h1>Home</h1>} />
    </Route>
  </Routes>
)}

export default App