import { Menu } from 'antd'
import * as React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import Arrow from './img/ico_angle.svg'

//@ts-ignore
import { mainMenuItems } from './mainMenuItems'
import { ClickedMenuItemData, MainMenuItem } from './Interfaces'

export default function HeaderMenu(): JSX.Element {
  const [current, setCurrent] = React.useState('innovation')

  const navigate = useNavigate()

  const onClick = (e: ClickedMenuItemData) => {
    console.log('asdjkhasdkjhasdkj')
    setCurrent(e.key)
    navigate(`/${e.key}`)
  }

  return (
    <StyledAppMenu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      {mainMenuItems.map((item: MainMenuItem) => {
        console.log('🌠', item)
        if (item.submenu) {
          return (
<<<<<<< HEAD
            <Menu.Item key={item.key} onClick={() => onClick}>
              <p>{item.label}</p>
            </Menu.Item>
=======
            <Menu.SubMenu
              key={item.key}
              title={
                <p className="collapsable-menu">
                  {item.label} <img className="menu-arrow" src={Arrow} />
                </p>
              }
            >
              {item.submenu.map((subItem: MainMenuItem) => {
                return <Menu.Item key={subItem.key}>{subItem.label}</Menu.Item>
              })}
            </Menu.SubMenu>
>>>>>>> parent of 7dd89dc (fix ts error)
          )
        }
        return (
          <Menu.Item key={item.key} onClick={() => console.log(item)}>
            <p>{item.label}</p>
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

    p {
      margin: 0;
    }

    .menu-arrow {
      transition: all 200ms;
    }

    .collapsable-menu {
      transition: all 200ms;
      &:hover > .menu-arrow {
        transition: all 200ms;
        transform: rotate(180deg);
      }
    }

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
