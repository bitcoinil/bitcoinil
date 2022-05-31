import { useCallback, useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import {
  Affix,
  Button,
  Collapse,
  List,
  Menu,
  TreeSelect,
  Tabs,
  Space,
  Divider
} from 'antd'
import styled, { createGlobalStyle } from 'styled-components'
import { useTheme } from '@/app/theme'
import { CompiledTheme, CompiledVariant } from '@djitsu/themes'
import {
  BgColorsOutlined,
  BulbOutlined,
  BugOutlined,
  CoffeeOutlined
} from '@ant-design/icons'

const { TabPane } = Tabs
const { Panel } = Collapse

type Props = {
  children: JSX.Element | JSX.Element[] | string
}

const App = (): JSX.Element => {
  return (
    <StyledContent>
      <Affix offsetTop={64}>
        <WorkshopMenu />
      </Affix>
      <Routes>
        <Route index element={<RedirectTo path="./theme" />} />
        <Route path="theme" element={<ThemeSection />} />
        <Route path="vibrancy" element={<VibrancySection />} />
      </Routes>
    </StyledContent>
  )
}
const RedirectTo = ({ path }: { path: string }): JSX.Element => {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(path)
  }, [])
  return <></>
}

const VibrancySection = ({}) => {
  const [count, setCount] = useState(0)
  const [vibrancy, setVibrancy] = useState('')
  const [loaded, setLoaded] = useState(false)

  const options =
    ', appearance-based, light, dark, titlebar, selection, menu, popover, sidebar, medium-light, ultra-dark, header, sheet, window, hud, fullscreen-ui, tooltip, content, under-window, under-page'.split(
      ', '
    )

  useEffect(() => {
    loaded && window.ipcRenderer.send('set-vibrancy', vibrancy)
  }, [vibrancy, loaded])

  useEffect(() => {
    window.ipcRenderer.invoke('get-vibrancy').then((vibrancy: string) => {
      setVibrancy(vibrancy)
      setLoaded(true)
    })
  }, [])
  const onEnter = useCallback(
    (event, option) => {
      if (option !== vibrancy) {
        if (event.shiftKey) {
          setVibrancy(option)
        }
      }
    },
    [vibrancy]
  )
  return (
    <section className="vibrancy">
      <h2>Vibrancy</h2>
      <Space
        split={<Divider type="vertical" />}
        direction="horizontal"
        size={16}
        wrap
      >
        {options.map((option) => (
          <Button
            key={`option-${option}`}
            className={vibrancy === option ? 'selected' : ''}
            onMouseEnter={(e) => onEnter(e, option)}
            type={vibrancy === option ? 'primary' : 'text'}
            onClick={() => setVibrancy(option)}
          >
            [{option}]
          </Button>
        ))}
      </Space>
    </section>
  )
}

const WorkshopMenu = ({}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedKey = useMemo(
    () => location.pathname.split('/')[2],
    [location.pathname]
  )

  return (
    <StyledAppMenu mode="horizontal" selectedKeys={[selectedKey]}>
      <Menu.Item
        key="theme"
        icon={<BgColorsOutlined />}
        onClick={() => navigate('./theme')}
      >
        Theme
      </Menu.Item>
      <Menu.Item
        key="vibrancy"
        icon={<BulbOutlined />}
        onClick={() => navigate('./vibrancy')}
      >
        Vibrancy
      </Menu.Item>
    </StyledAppMenu>
  )
}

/* @ts-ignore */
const StyledAppMenu = styled(Menu)`
  &.ant-menu {
    background: transparent;
    background: rgba(255, 255, 255, 0);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
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
const StyledApp = styled.main`
  border: 2px solid #f0f;
  /* background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px); */
`
const StyledHeader = styled.header``
const StyledAppBar = styled.div`
  -webkit-user-select: none;
  user-select: none;
  -webkit-app-region: drag;
  height: 32px;
  background: green;
`
const StyledContent = styled.section`
  ul {
    > li {
      & .selected {
        background: green;
      }
    }
  }
`

const ThemeSection = () => {
  const [themesState, themesActions] = useTheme()

  const onChange = useCallback(
    (theme, variant = null) => {
      themesActions.setTheme(theme.name, variant?.name)
    },
    [themesActions]
  )

  return (
    <StyledThemesSection className="themes">
      <h2>Themes</h2>
      <List
        itemLayout="vertical"
        dataSource={themesState.themes}
        renderItem={(theme) => (
          <List.Item
            extra={
              <>
                <Button
                  type={
                    themesState.active.theme === theme.name &&
                    !themesState.active.variant
                      ? 'primary'
                      : 'text'
                  }
                  onClick={() => onChange(theme)}
                >
                  Set Theme
                </Button>
              </>
            }
          >
            <List.Item.Meta
              avatar={<CoffeeOutlined />}
              title={<span>{theme.title || theme.name}</span>}
              description={theme.description}
            />
            <List
              itemLayout="horizontal"
              size="small"
              dataSource={theme.variants}
              renderItem={(variant: CompiledVariant) => (
                <List.Item
                  actions={[
                    <Button
                      type={
                        themesState.active.theme === theme.name &&
                        themesState.active.variant === variant.name
                          ? 'primary'
                          : 'text'
                      }
                      onClick={() => onChange(theme, variant)}
                    >
                      Set Variant
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<CoffeeOutlined />}
                    title={<span>{variant.title || variant.name}</span>}
                    description={variant.description}
                  />
                </List.Item>
              )}
            />
          </List.Item>
        )}
      />
      <Collapse defaultActiveKey="debug">
        <Panel
          header={
            <span>
              <BugOutlined /> Theme Debug
            </span>
          }
          key="debug"
        >
          <pre>
            `themeState.active` = {JSON.stringify(themesState.active, null, 2)}
          </pre>
          <pre>
            `themeState.debug` = {JSON.stringify(themesState.debug, null, 2)}
          </pre>
          <pre>
            `themeState.themes` = {JSON.stringify(themesState.themes, null, 2)}
          </pre>
        </Panel>
      </Collapse>
    </StyledThemesSection>
  )
}

const StyledThemesSection = styled.section`
  ul > li ul {
    margin-left: 30px;
  }
`

type ThemeItemProps = {
  theme: CompiledTheme
  setSelected: (theme: CompiledTheme, variant?: CompiledVariant) => void
}
const ThemeItem = ({ theme, setSelected }: ThemeItemProps) => (
  <article>
    <h3 onClick={() => setSelected(theme)}>{theme.name}</h3>
    <ul>
      {theme.variants.map((variant: CompiledVariant) => (
        <li
          key={`${theme.name}-${variant.name}`}
          onClick={() => setSelected(theme, variant)}
        >
          {variant.name}
        </li>
      ))}
    </ul>
  </article>
)

export default App
