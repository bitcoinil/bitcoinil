import { Routes, Route } from 'react-router-dom'

import Home from './home.route'
import Workshop from '../../workshop'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/workshop/*" element={<Workshop />} />
    </Routes>
  )
}

export default AppRoutes
