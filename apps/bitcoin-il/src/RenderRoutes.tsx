import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { mainMenuItems } from './mainMenuItems'

function RenderRoutes(): JSX.Element {
  return (
    <Routes>
      {mainMenuItems.map((menuItem, i) => {
        const { submenu } = menuItem

        if (submenu) {
          return submenu.map((subMenuItem, ii) => {
            return (
              <Route
                key={`submenu-item-${ii}`}
                path={`/${subMenuItem.key}`}
                element={subMenuItem.element}
              />
            )
          })
        }

        return (
          <Route key={i} path={`/${menuItem.key}`} element={menuItem.element} />
        )
      })}

      <Route path="*" element={'HOME PAGE HERE'} />
    </Routes>
  )
}

export default RenderRoutes
