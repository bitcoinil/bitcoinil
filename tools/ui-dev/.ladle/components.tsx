import { ThemeState } from '@ladle/react/lib/shared/types'

import type { GlobalProvider } from '@ladle/react'
import { StoryContext } from '../src/story-context'
import { lazy } from 'react';

const Dark = lazy(() => import('./dark'));
const Light = lazy(() => import('./light'));

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <>
    {globalState.theme === ThemeState.Light ? <Light /> : <Dark />}
    <StoryContext.Provider value={globalState}>
      {children}
    </StoryContext.Provider>
  </>
)
