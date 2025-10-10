import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppContainer from './context/AppContext'
import AppRouter from './router'

function App() {
  return <AppContainer>
    <AppRouter/>
  </AppContainer>
}

export default App
