import { BrowserRouter, Route, Routes } from "react-router-dom"
import AdminDashboard from '../pages/AdminDashboard'
import UserDashboard from '../pages/UserDashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path = "/user" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
