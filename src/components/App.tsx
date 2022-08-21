import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import PuzzleProvider from './PuzzleProvider/PuzzleProvider'
import WordEntry from './WordEntry/WordEntry'
import WordConfirmation from './WordConfirmation/WordConfirmation'
import GuessProvider from './GuessProvider/GuessProvider'
import Guess from './Guess/Guess'
import Congratulations from './Congratulations/Congratulations'

const App = () => (
  <HashRouter>
    <PuzzleProvider>
      <Routes>
        <Route path="/" element={<WordEntry />} />
        <Route path="/confirm" element={<WordConfirmation />} />
        <Route
          path="/guess"
          element={
            <GuessProvider>
              <Guess />
            </GuessProvider>
          }
        />
        <Route path="/congratulations" element={<Congratulations />} />
      </Routes>
    </PuzzleProvider>
  </HashRouter>
)

export default App
