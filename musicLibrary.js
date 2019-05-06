const enums = require('./enums')

class Library {
    constructor() {
        this.artists = {}
        this.titles = new Set([])
    }

    addTitleAndArtist(title, artist) {
        if (this.titleIsDuplicate(title))
            return console.log('Title already exists in library!')

        if (this.artists[artist]) {
            this.artists[artist].push(title)
        } else {
            this.artists[artist] = [title]
        }
        this.titles[title] = enums.unplayed
        console.log(`Added "${title}" by ${artist}`);
    }

    getAll() {
        let str = '';
        for (const artist in this.artists) {
            str += this.getTitlesAndStatus(artist)
        }
        return !str ? 'Nothing stored yet' : str
    }

    getAllByArtist(artist) {
        if (!this.artists[artist])
            return console.log("This artist doesn't exist")

        let str = '';
        const collection = this.artists[artist]
        for (const title of collection) {
            str += `"${title}" by ${artist} (${this.titles[title]})`
            str += '\n'
        }
        return str
    }

    play(title) {
        if (!this.titles[title])
            return console.log("This title doesn't exist")

        this.titles[title] = enums.played
        console.log(`You're listening to "${title}"`)
    }

    getUnplayedByArtist(artist) {
        const collection = this.artists[artist]
        if (!collection)
            return console.log("This artist doesn't exist")

        let str = ''
        for (const title of collection) {
            if (this.titles[title] === enums.unplayed){
                str += `"${title}" by ${artist} (${enums.unplayed})`
                str += "\n"
            }
        }
        return !str ? 'No unplayed tracks by this artist' : str
    }

    getAllUnplayed() {
        let str = ''
        for (const artist in this.artists) {
            const collection = this.artists[artist]
            for (const title of collection) {
                if (this.titles[title] === enums.unplayed) {
                    str += `"${title}" by ${artist} (${enums.unplayed})`
                    str += "\n"
                }
            }
        }
        return !str ? 'No unplayed tracks' : str
    }

    getTitlesAndStatus(artist) {
        const collection = this.artists[artist]
        let str = ''
        for (const title of collection) {
            const playedOrUnplayed = this.titles[title]
            str += `"${title}" by ${artist} (${playedOrUnplayed})`
            str += "\n"
        }
        return str
    }

    titleIsDuplicate(title) {
        if (this.titles[title]) {
            return true
        } else {
            return false
        }
    }
}

module.exports = Library;