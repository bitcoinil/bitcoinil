import { Menu } from "antd"
import React, { useState } from "react"
import styled from "styled-components"
import { mainMenuItems } from "./mainMenuItems"

export default function HeaderMenu({ navigate }) {
  const [current, setCurrent] = useState("mail")

  const onClick = (e) => {
    setCurrent(e.key)
    navigate(`/${e.key}`)
  }

  return (
    <StyledAppMenu onClick={onClick} selectedKeys={[current]} mode="horizontal">
      {mainMenuItems.map((item) => {
        if (item.submenu) {
          return (
            <Menu.SubMenu key={item.key} title={item.label}>
              {item.submenu.map((subItem) => {
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
