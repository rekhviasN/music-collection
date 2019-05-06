module.exports = {

	parseCommand : (line) => {
		// Returns the option that first matches the start of the string
		const match = line.match(/^(add|play|show unplayed by|show unplayed|show all by|show all|quit)\b/i)
		return match ? match[0] : null
	},

	parseTitle : (line) => {
		const series = line.split('"')
		if(series.length!==3)
			return 0
		return series[1]
	},

	parseTitleAndArtist: (line) => {
		const series = line.split('"')
		if(series.length!==5 || (series[2]!==" " || series[4]!=="" || series[1] === "" || series[3] === ""))
			return 0
		return [series[1], series[3]]
	},

	parseArtist : (line) => {
		const series = line.split('"')
		if(series.length!==3)
			return 0
		return series[1]
	},

}