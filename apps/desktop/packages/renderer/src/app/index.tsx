import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  NavLink as RouterNavLink,
  useNavigate,
  useLocation
} from 'react-router-dom'
import { ControlOutlined, HomeOutlined, ToolOutlined } from '@ant-design/icons'

import { Affix, Button, Layout, Menu, Tooltip } from 'antd'
import styled, { createGlobalStyle } from 'styled-components'
import AppRouter from './router'
import AppRoutes from './routes'
import Theme from './theme'

const { Header, Footer, Sider, Content } = Layout

const App = (): JSX.Element => {
  const openDevTools = useCallback(() => {
    window.ipcRenderer.send('open-devtools')
  }, [])

  return (
    <AppRouter>
      <Theme>
        <StyledApp>
          <GlobalStyle />
          <Affix>
            <StyledHeader>
              <StyledAppBar>
                <span>Djitsu</span>
                <aside>
                  <Tooltip title="Devtools" placement="left">
                    <Button
                      type="text"
                      onClick={openDevTools}
                      className="devtools"
                      icon={<ToolOutlined />}
                    />
                  </Tooltip>
                </aside>
              </StyledAppBar>
              <AppMenu />
            </StyledHeader>
          </Affix>
          <StyledContent>
            <AppRoutes />
          </StyledContent>
          <Affix offsetBottom={0}>
            <StyledStatusbar>Status Bar</StyledStatusbar>
          </Affix>
        </StyledApp>
      </Theme>
    </AppRouter>
  )
}

const AppMenu = ({}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const currentKey = useMemo(
    () => location.pathname?.replace(/^\/$/, '/home').split('/')[1],
    [location.pathname]
  )

  return (
    <StyledAppMenu mode="horizontal" selectedKeys={[currentKey]}>
      <Menu.Item
        key="home"
        icon={<HomeOutlined />}
        onClick={() => navigate('/')}
      >
        Home
      </Menu.Item>
      <Menu.Item
        key="workshop"
        icon={<ControlOutlined />}
        onClick={() => navigate('/workshop')}
      >
        Workshop
      </Menu.Item>
    </StyledAppMenu>
  )
}

const StyledAppMenu = styled(Menu)`
  &.ant-menu {
    background: transparent;
    border-bottom: none;
    > li {
      &.ant-menu-item {
        line-height: 24px;
        &::after {
          left: 12px;
          right: 12px;
        }
      }
    }
  }
`

type NavLinkProps = {
  children: string | JSX.Element
  to: string
}
const NavLink = (props: NavLinkProps) => (
  <StyledNavLink
    className={({ isActive }: { isActive: Boolean }) =>
      isActive ? 'active' : ''
    }
    {...props}
  />
)

const StyledNavLink = styled(RouterNavLink)`
  &.active {
    font-weight: bold;
  }
`

const GlobalStyle = createGlobalStyle`
  html, body {
  }
`

const StyledApp = styled(Layout)`
  /* border: 2px solid #f0f; */
  /* background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px); */
  &.ant-layout {
    background: transparent;
    min-height: 100vh;
  }
`
const StyledHeader = styled(Header)`
  &.ant-layout-header {
    padding: 0;
    background: transparent;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    background: rgba(255, 255, 255, 0);
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
      background: rgba(255, 255, 255, 0);
    }
    > .ant-menu {
      line-height: 1em;
    }
  }
`
const StyledNavigation = styled.nav`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  line-height: 1em;
  > span:empty {
    flex: 1 1 auto;
  }
`
const StyledAppBar = styled.div`
  --traffic-light-width: 80px;
  -webkit-user-select: none;
  user-select: none;
  -webkit-app-region: drag;
  height: 32px;
  /* background: green; */
  line-height: 32px;
  /* border-bottom: 1px solid red; */
  position: relative;
  padding: 0 var(--traffic-light-width);
  display: flex;
  background: rgba(255, 255, 255, 0);
  transition: all 0.2s ease-in-out;
  border-bottom: 1px solid rgba(190, 190, 190, 0);
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-bottom-color: rgba(40, 40, 40, 0.1);
  }

  &::after,
  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 120px;
    height: 10px;
    left: 0;
  }
  &::before {
    top: 0px;
    /* background: rgba(255, 0, 0, 0.5); */
  }
  &::after {
    bottom: 0px;
    /* background: rgba(0, 255, 0, 0.5); */
  }

  > * {
    /* border: 1px solid blue; */
  }
  > span {
    flex: 1 1 auto;
    text-align: center;
    /* border: 1px solid #f0f; */
  }
  > aside {
    position: absolute;
    right: 0;
    opacity: 0.1;
    transition: opacity 0.2s ease-in-out;
  }
  &:hover {
    > aside {
      opacity: 0.4;
      &:hover {
        opacity: 1;
      }
    }
  }

  .devtools {
    &,
    & > span,
    & > span > svg {
      cursor: pointer;
    }
  }
`
const StyledContent = styled(Content)`
  background-color: var(--body-background);
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;

  ul {
    > li {
      & .selected {
        background: green;
      }
    }
  }
`

const StyledStatusbar = styled(Footer)`
  &.ant-layout-footer {
    padding: 0;
    height: 24px;
    // glass effect
    background: transparent;
  }
`

export default App
