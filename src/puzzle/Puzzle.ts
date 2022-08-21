import { IPuzzleGuess } from './PuzzleGuess'

export default class Puzzle {
  private static convertToUppercase(word: string): string {
    return word.toUpperCase()
  }

  static convertListToUppercase(words: Array<string>): Array<string> {
    return words.map((word) => Puzzle.convertToUppercase(word))
  }

  static filterWords(availableWords: Array<string>, guess: IPuzzleGuess): Array<string> {
    const matchMap = Puzzle.convertListToUppercase(availableWords).map((word: string) => {
      let matches = 0
      for (let i = 0; i < word.length; i++) {
        if (guess.word[i] === word[i]) {
          matches++
        }
      }
      return { word, matches }
    })

    return matchMap.filter((map) => map.matches === guess.matches).map((map) => map.word)
  }
}
