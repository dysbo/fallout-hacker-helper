import Puzzle from './Puzzle'

describe('Puzzle tests', () => {
  test('should turn word list to caps', () => {
    const wordList = ['lower', 'cases']
    const transformedWordList = Puzzle.convertListToUppercase(wordList)
    expect(transformedWordList).toEqual(['LOWER', 'CASES'])
  })

  test.each([
    [['CHAIN', 'BRAIN', 'TRAIN'], 'TRAIN', 3, ['CHAIN']],
    [['BLINK', 'FLUNK', 'AUDIO'], 'BLINK', 0, ['AUDIO']]
  ])(
    'should filter %o tested against %s with %s matches to %o',
    (initial: Array<string>, word: string, matches: number, final: Array<string>) => {
      const result = Puzzle.filterWords(initial, { word, matches })
      expect(result).toEqual(final)
    }
  )
})
