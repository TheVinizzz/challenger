import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage, FormProduct, Payment } from '@/pages'
import { LoggedLayout } from './layouts'

export default function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/payment" element={<Payment />} />
        <Route element={<LoggedLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/create" element={<FormProduct />} />
          <Route path="/product/:id/edit" element={<FormProduct />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}
