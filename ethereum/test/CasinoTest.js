const Casino = artifacts.require('./Casino.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Casino', ([deployer, player1, player2, player3]) => {
  let casino

  before(async () => {
    casino = await Casino.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await casino.address
      assert.notEqual(address, 0x0)
    })

  describe('play game & decide the winner', async () => {

    it('creates products', async () => {
      // SUCCESS
      await  casino.bet(5, { from: player1, value: 1 })
      await  casino.bet(6, { from: player2, value: 1 })
    })
})
  })
})