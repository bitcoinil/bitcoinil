import { Story } from '@ladle/react'
import { GlobalState } from '@ladle/react/lib/shared/types'
import { useStory } from './story-context'

export const ControlsDemo: Story<{
  globalState: GlobalState
  label: string
  disabled: boolean
  count: number
  colors: string[]
  variant: string
  size: string
}> = ({ count, disabled, label, colors, variant, size }) => {
  const state = useStory()

  return (
    <>
      {!!state && (
        <>
          {Object.entries(state).map(([key, value]) => (
            <div key={key}>
              {key}:{' '}
              {typeof value === 'string' ? (
                <code>{value}</code>
              ) : (
                <pre>{JSON.stringify(value, null, 1)}</pre>
              )}
            </div>
          ))}
          <hr />
        </>
      )}
      <p>Count: {count}</p>
      <p>Disabled: {disabled ? 'yes' : 'no'}</p>
      <p>Label: {label}</p>
      <p>Colors: {colors.join(',')}</p>
      <p>Variant: {variant}</p>
      <p>Size: {size}</p>
    </>
  )
}
ControlsDemo.args = {
  label: 'Hello world',
  disabled: false,
  count: 2,
  colors: ['Red', 'Blue']
}
ControlsDemo.argTypes = {
  variant: {
    options: ['primary', 'secondary'],
    control: { type: 'radio' },
    defaultValue: 'primary'
  },
  size: {
    options: ['small', 'medium', 'big', 'huuuuge'],
    control: { type: 'select' }
  }
}
