import { Menu } from 'antd'
import * as React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

//@ts-ignore
import { mainMenuItems } from './mainMenuItems'
import { ClickedMenuItemData, MainMenuItem } from './Interfaces'

export default function HeaderMenu(): JSX.Element {
  const [current, setCurrent] = React.useState('mail')

  const navigate = useNavigate()

  const onClick = (e: ClickedMenuItemData) => {
    setCurrent(e.key)
    navigate(`/${e.key}`)
  }

  return (
    <StyledAppMenu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      {mainMenuItems.map((item: MainMenuItem) => {
        console.log('🌠', item)
        if (item.submenu) {
          return (
            <Menu.SubMenu key={item.key} title={item.label}>
              {item.submenu.map((subItem: MainMenuItem) => {
                return <Menu.Item key={subItem.key}>{subItem.label}</Menu.Item>
              })}
            </Menu.SubMenu>
          )
        }
        return (
          <Menu.Item key={item.key} onClick={() => console.log(item)}>
            {item.label}
          </Menu.Item>
        )
      })}
    </StyledAppMenu>
  )
}

// @ts-ignore
const StyledAppMenu = styled(Menu)`
  width: 80vw;
  display: flex;
  align-items: center;
  justify-content: center;

  &.ant-menu {
    background: transparent;
    border-bottom: none;

    > li {
      &::after {
        width: 0;
        height: 0;
      }
      &.ant-menu-item {
        &::after {
          width: 0;
          height: 0;
        }
      }
    }
  }
`
