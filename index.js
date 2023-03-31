const { createWriteStream, existsSync, mkdirSync } = require('fs')
const { resolve } = require('path')
const axios = require('axios')

const baseUrl = "https://starwars-visualguide.com/assets/img"

// asset name schema matches with SWAPI source URI so resource set count is predictable
const count = {
	people: 82,
	planets: 60,
	films: 6,
	species: 37,
	vehicles: 39,
	starships: 36
}

function request(base, type, id) {
	axios.get(`${baseUrl}/${type}/${id}.jpg`, { responseType: 'stream' })

		.then((response) => {
			let path = `./data/${type}/`

			// create data directory should it not exist
			if (!existsSync(path)) {
				mkdirSync(path, { recursive: true })
			}

			response.data.pipe(createWriteStream(resolve(path, `${id}.jpg`)))
		})

		.catch((error) => {
			console.log(`could not resolve ${type} ${id} at ${baseUrl}/${type}/${id}.jpg: ${error}`)
		})
}