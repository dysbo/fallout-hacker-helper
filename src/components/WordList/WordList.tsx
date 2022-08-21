import { useContext } from 'react'
import { puzzleContext } from '../../context'

const WordList = () => {
  const puzzle = useContext(puzzleContext)

  return (
    <div className="text word-list">
      {puzzle.availableWords.map((word) => (
        <div key={word}>{word}</div>
      ))}
    </div>
  )
}

export default WordList
