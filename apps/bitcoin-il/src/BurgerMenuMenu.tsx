import { Menu } from 'antd'
import * as React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { BurgerMenuMenuProps, MainMenuItem } from './Interfaces'
import { mainMenuItems } from './mainMenuItems'

const BurgerMenuMenu: React.FC<BurgerMenuMenuProps> = ({ setMenuOpen }) => {
  return (
    <StyledBurgerMenuMenu>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        onClick={() => setMenuOpen(false)}
      >
        {mainMenuItems.map((item: any) => {
          if (item.submenu) {
            return (
              <Menu.SubMenu
                key={item.key}
                title={<p className="collapsable-menu">{item.label}</p>}
              >
                {item.submenu.map((subItem: MainMenuItem) => {
                  return (
                    <Menu.Item key={subItem.key}>
                      <NavLink to={`/${subItem.key}`}>{subItem.label}</NavLink>
                    </Menu.Item>
                  )
                })}
              </Menu.SubMenu>
            )
          }
          return (
            <Menu.Item key={item.key} onClick={() => console.log(item)}>
              <p>{item.label}</p>
            </Menu.Item>
          )
        })}
      </Menu>
    </StyledBurgerMenuMenu>
  )
}

export default BurgerMenuMenu

const StyledBurgerMenuMenu = styled.div`
  .ant-menu {
    .ant-menu-submenu-title {
      padding: 0 !important;
      margin: 0;
    }
    li,
    .ant-menu-item {
      padding: 0 !important;
    }
  }

  .ant-menu,
  .ant-menu-item-selected {
    color: white;
    background-color: black;
    p {
      text-align: center;
    }

    .collapsable-menu {
      margin: 0;
    }

    img {
      /* position: absolute; */
      background-color: maroon;
    }

    .ant-menu-item,
    .ant-menu-item-active,
    .ant-menu-item-selected,
    .ant-menu-item-only-child {
      background: black;
      color: white;
      text-align: center;
      padding: 0;
    }

    .ant-menu-title-content {
      width: 100vw;
    }

    .ant-menu-item,
    .ant-menu-item-only-child {
      background: black;
      a {
        color: white;
      }
    }

    li {
      color: white;
    }

    .ant-menu-submenu-arrow::before,
    .ant-menu-submenu-arrow::after {
      color: white;
    }
  }
`
