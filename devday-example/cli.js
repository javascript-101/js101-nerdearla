const ora = require('ora')
const jsFire = require('js-fire')
const axios = require('axios')
const cheerio = require('cheerio')

const delay = ms => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
}

async function main() {
  const spinner = ora(' => Cargando datos de la Devday').start()

  await delay(3000)
  const response = await axios.get('https://devday-ar.com/')
  const html = response.data

  const $ = cheerio.load(html)
  const talks = $('#talk')

  const roomRobleTalks = talks.find('td[data-column="Roble"]')
  const data = []

  roomRobleTalks.each(function(index, talk) {
    const speakerName = $(talk)
      .find('h4')
      .text()
    const talkTitle = $(talk)
      .find('p')
      .text()

    const talkData = {
      title: talkTitle,
      speaker: speakerName,
    }

    data.push(talkData)
  })

  spinner.stop()
  // console.table(data)

  const devdayCli = {
    speakers: speaker => {
      const talkFound = data.find(talk => {
        return talk.speaker === speaker
      })

      if (talkFound) {
        console.log('Charla encontrada', talkFound)
      } else {
        console.log('Charla no encontrada')
      }
    },
    displayEvents: () => {
      console.table(data)
    },
  }

  jsFire(devdayCli)
}

main()
