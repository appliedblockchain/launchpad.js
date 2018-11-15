const Notes = artifacts.require('Notes')

contract('Notes', function(accounts) {
  let notes

  beforeEach(async () => {
    from = accounts[0]
    user1 = accounts[1]
    notes = await Notes.new({ gas: 5000000, from })
  })

  it('Can add a note', async () => {
    const tx = await notes.addNote('test', 'context', from, [], '0x', { from })

    expect(tx.logs[0].event).to.equal('NoteAdded')
    const { id } = tx.logs[0].args

    expect(id.eq(0)).to.equal(true)
  })

})
