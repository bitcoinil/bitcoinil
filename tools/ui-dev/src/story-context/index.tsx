import {
  GlobalState,
  ModeState,
  ThemeState
} from '@ladle/react/lib/shared/types'
import { createContext, useContext } from 'react'

export const StoryContext = createContext<GlobalState | undefined>({
  theme: ThemeState.Light,
  mode: ModeState.Full,
  story: '',
  rtl: false,
  control: {}
})

export const useStory = () => useContext(StoryContext)
