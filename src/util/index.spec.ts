import * as utils from './index'

describe('util tests', () => {
  describe('dummy function', () => {
    test('should not do anything', () => {
      const spy = jest.spyOn(utils, 'dummyFunction')
      utils.dummyFunction()
      expect(spy).toHaveReturnedWith(undefined)
    })
  })
})
