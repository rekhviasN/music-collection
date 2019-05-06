const Library = require('./musicLibrary')
const { parseCommand, parseTitle, parseTitleAndArtist, parseArtist } = require('./helpers')
const { expect } = require('chai')

describe('Library Constructor', () => {

  it('adds new title and artist to library', () => {
  	let library = new Library()
  	library.addTitleAndArtist('Like a prayer', 'Madonna')
  	expect(library.artists['Madonna']).to.have.lengthOf(1)
  });

  it('does not allow duplicate titles', () => {
  	let library = new Library()
  	library.addTitleAndArtist('Like a prayer', 'Madonna')
  	library.addTitleAndArtist('Like a prayer', 'Madonna')
  	expect(library.artists['Madonna']).to.have.lengthOf(1)
  });
  
  it('lists all artists correctly', () => {
  	let library = new Library()
  	library.addTitleAndArtist('Like a prayer', 'Madonna')
  	library.addTitleAndArtist('Hung up', 'Madonna')
  	const allByArtist = library.getAllByArtist("Madonna")
  	expect(allByArtist).to.equal('"Like a prayer" by Madonna (unplayed)\n"Hung up" by Madonna (unplayed)\n')
  });

  it('changes the status of a song to played after its played', () => {
  	let library = new Library()
  	library.addTitleAndArtist('Like a prayer', 'Madonna')
  	library.addTitleAndArtist('Hung up', 'Madonna')
  	library.play('Hung up')
  	const allByArtist = library.getAllByArtist("Madonna")
  	expect(allByArtist).to.equal('"Like a prayer" by Madonna (unplayed)\n"Hung up" by Madonna (played)\n')
  });

  it('returns unplayed songs by artist', () => {
  	let library = new Library()
  	library.addTitleAndArtist('Like a prayer', 'Madonna')
  	library.addTitleAndArtist('Hung up', 'Madonna')
  	library.play('Hung up')
  	const allByArtist = library.getUnplayedByArtist("Madonna")
  	expect(allByArtist).to.equal('"Like a prayer" by Madonna (unplayed)\n')
  });

  it('returns all unplayed songs', () => {
  	let library = new Library()
  	library.addTitleAndArtist('Like a prayer', 'Madonna')
  	library.addTitleAndArtist('Hung up', 'Madonna')
  	library.play('Hung up')
  	library.addTitleAndArtist('If you want to sing out, sing out', 'Yusuf / Cat Stevens')
  	const allUnplayed = library.getAllUnplayed()
  	expect(allUnplayed).to.equal('"Like a prayer" by Madonna (unplayed)\n"If you want to sing out, sing out" by Yusuf / Cat Stevens (unplayed)\n')
  });
});

describe('Parsers / Helpers', () => {

  it('parses the action command', () => {
  	let string = 'add "Peace Train" "Yusuf / Cat Stevens"'
  	expect(parseCommand(string)).to.equal('add')
  	string = 'play "Peace Train"'
  	expect(parseCommand(string)).to.equal('play')
  	string = 'show all by "Yusuf / Cat Stevens"'
  	expect(parseCommand(string)).to.equal('show all by')
  	string = 'show unplayed by "Yusuf / Cat Stevens"'
  	expect(parseCommand(string)).to.equal('show unplayed by')
  	string = 'show all'
  	expect(parseCommand(string)).to.equal('show all')
  	string = 'something else "now"'
  	expect(parseCommand(string)).to.equal(null)
  });

  it('parses title', () => {
  	let string = 'play "The Wire"'
  	expect(parseTitle(string)).to.equal('The Wire')
  	string = 'play "improper string'
  	expect(parseTitle(string)).to.equal(0)
  });
  
  it('parses title and artist', () => {
  	let string = 'add "The Wire" "HAIM"'
  	expect(parseTitleAndArtist(string)).to.deep.equal(['The Wire', 'HAIM'])
  	string = 'add "something" ""'
  	expect(parseTitleAndArtist(string)).to.equal(0)
  });

  it('parses artist', () => {
  	let string = 'show all by "Madonna"'
  	expect(parseArtist(string)).to.equal("Madonna")
  	string = 'show unplayed by "Madonna"'
  	expect(parseArtist(string)).to.equal("Madonna")
  	string = 'show unplayed by Madonna'
  	expect(parseArtist(string)).to.equal(0)
  });

});