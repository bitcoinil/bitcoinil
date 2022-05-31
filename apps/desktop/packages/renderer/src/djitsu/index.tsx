import { Button, Empty } from 'antd'
import styled from 'styled-components'

const Djitsu = () => {
  return (
    <StyledEmpty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60
      }}
      description={
        <span>
          No Djits
        </span>
      }
    >
      <Button type="primary">Create Now</Button>
    </StyledEmpty>
  )
}

const StyledEmpty = styled(Empty)`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default Djitsu
