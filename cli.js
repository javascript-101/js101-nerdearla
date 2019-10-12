/*
1. Inicializemos nuestro proyecto con npm init -y
2. Agreguemos como dependencia a axios para poder hacer un request GET
   y obtener la página de Nerdearla.
3. Agreguemos como dependencia cheerio con npm install cheerio
   Que nos permitirá obtener elementos con una API similar a jQuery.
4. Agreguemos como dependencia de desarrollador a nodemon, npm install -D nodemon
   Para estar escuchando cambios en nuestro JS y volver a ejecutar Node.js sobre el mismo
5. Hagamos require de axios y cheerio
6. Creemos una función main para correr nuestra cli principal
7. Vamos a hacer un GET con axios para obtener el HTML de la agenda de nerdearla que vive en https://nerdear.la/agenda/
8. Ahora que ya tenemos el HTML debemos cargarlo a cheerio, usando el método .load()
9.
   */

const axios = require('axios')
const cheerio = require('cheerio')
const ora = require('ora')
const fire = require('js-fire')
const boxen = require('boxen')

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const DAYS = {
  'Día 1': 'one',
  'Día 2': 'two',
  'Día 3': 'three',
}

const ROOM_NAMES = {
  'Auditorio Cognizant/Despegar': 'cognizantRoom',
  'Auditorio openqube': 'openQubeRoom',
  'Auditorio openqube.io': 'openQubeRoom',
  'Sala sysarmy, workshops': 'sysArmyRoom',
}

const main = async () => {
  // Antes de realizar la lógica para obtener los datos, queremos obtener una estructura
  // llamada nerdearlaEvents para ir almacenando los datos en esta
  const nerdearlaEvents = {
    days: {
      one: {
        cognizantRoom: [],
        openQubeRoom: [],
        sysArmyRoom: [],
      },
      two: {
        cognizantRoom: [],
        openQubeRoom: [],
        sysArmyRoom: [],
      },
      three: {
        cognizantRoom: [],
        openQubeRoom: [],
        sysArmyRoom: [],
      },
    },
  }

  // Mostremos un spinner
  const spinner = ora('Cargando data de Nerdearla 🚀').start()

  await delay(1000)

  // Obtenemos el HTML de nerder.la/agenda
  const { data } = await axios.get('https://nerdear.la/agenda/')

  // Lo pasamos por Cheerio para poder obtener elementos del mismo
  const $ = cheerio.load(data)

  // Obtenemos cada una de las cajas largas que contienen los workshops/charlas que son elementos
  const days = $('ul.scheduleday_wrapper')

  // Iteramos sobre todas los  ul
  days.each((index, ul) => {
    // Obtenemos el titulo del ul que es por ej "Día 1 - Auditorio Cognizant/Despegar"
    const title = $(ul)
      .find('.scheduleday_title_content h4')
      .text()

    // Vamos a separar el día del lugar usando split()
    const [day, room] = title.split(' - ')

    // Obtenemos el subtitulo del ul que es por ej "17 de Octubre, charlas técnicas"
    const subtitle = $(ul)
      .find('.scheduleday_desc')
      .text()

    // Vamos a separar la fecha de la descripción usando split()
    const [date, description] = subtitle.split(', ')

    // Obtenemos todas los workshops/charlas que son elementos li
    const cards = $(ul).find('li')

    // Obtenemos todas los workshops/charlas que son elementos li
    cards.each((index, li) => {
      if (index === 0) return

      const time = $(li)
        .find('.session_start_time')
        .text()

      const title = $(li)
        .find('.session_title')
        .text()

      const info = $(li)
        .find('.session_speakers')
        .text()

      // Guardamos estos datos en un objeto
      const talk = { time, title, info }

      // Obtenemos los nombres de las keys que existen en nerdearlaEvents a partir del day y room
      const parsedDay = DAYS[day]
      const parsedRoom = ROOM_NAMES[room]

      // Insertamos estos datos donde corresponda en nerdearlaEvents
      nerdearlaEvents.days[parsedDay][parsedRoom].push(talk)
    })
  })

  // Pausemos el spinner
  spinner.stop()

  // jclrz(nerdearlaEvents)
  // console.log(JSON.stringify(dataParsed, null, 2))

  // Ahora inicializemos la CLI

  const nerdearlaCli = {
    days: day => {
      const nerdearlaEventsDay = nerdearlaEvents.days[day]

      Object.entries(nerdearlaEventsDay).forEach(([room, talks]) => {
        console.log(room)
        console.log('\n')

        talks.forEach(talk => {
          console.log()
        })
      })
    },
  }

  fire(nerdearlaCli)
}

main()

/*

Otras libs: js-fire pkg

CLI: nerdearla-cli
1. Spinner cargando datos de nerdear.la
2. Mostrar opciones con la CLI
3. Selecciona uno de los 3 días
4. Por ej selcciono dia uno
5. Elegir por un lado si visualizar las charlas o bien los workshops
6. Por ej selecciono workshops
7. Mostramos la lista de todos los workshops
8. Selecciona el de JS101
9. Integración alguna integración con alguna API, por ej Google Calendar
Agendar ese workshop

CLI:
nerdearla-cli --workshops // por ej eso me lista todos los workshops ordenado cronologicamente
nerdearla-cli --talks // por ej me lista todas las charlas ordenadas cronologicamente
nerdearla-cli --id 1843 // mostramos toda la info de esa charla/workshop
nerdearla-cli --day one // mostramos toda las las charlas/workshops de ese día

*/
