import { HashRouter } from 'react-router-dom'

type Props = {
  children: JSX.Element
}
const AppRouter = ({ children }: Props) => {
  return <HashRouter>{children}</HashRouter>
}

export default AppRouter
