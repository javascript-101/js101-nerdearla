const axios = require('axios')
const cheerio = require('cheerio')
const ora = require('ora')
const fire = require('js-fire')

const DAYS = {
  one: 'Día 1',
  two: 'Día 2',
  three: 'Día 3',
}

const ROOM_NAMES = {
  cognizantRoom: 'Auditorio Cognizant/Despegar',
  openQubeRoom: 'Auditorio openqube',
  sysArmyRoom: 'Sala sysarmy, workshops',
}

const TALK_TYPE = {
  'charlas técnicas': 'tecnica',
  'rH (menos recursos': 'rrhh',
  workshop: 'workshop',
}

const main = async () => {
  // Creamos un array nerdearlaEvents para ir almacenando todos en este
  const nerdearlaEvents = []

  // Mostremos un spinner
  const spinner = ora('Cargando data de Nerdearla 🚀').start()

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
    const [date, description = ''] = subtitle.split(', ')

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

      // Obtengamos el tipo de charla: técnica, rh, o workshop (este puede estar en el room (workshops) o bien en description)
      const type = room === ROOM_NAMES.sysArmyRoom ? TALK_TYPE.workshop : TALK_TYPE[description]

      // Guardamos estos datos en un objeto + el day, room, date y description que viven por fuera de esta función
      const talk = { title, type, time, info, day, room, date }

      // Insertamos estos datos en el array nerdearlaEvents
      nerdearlaEvents.push(talk)
    })
  })

  // Pausemos el spinner
  spinner.stop()

  // Ahora creamos el objeto de configuración para la CLI
  const nerdearlaCli = {
    // Podemos pedir a la CLI por los eventos en un día en particular: one, two, three
    days: day => {
      const parsedDay = DAYS[day]
      const nerdearlaTalksByDay = nerdearlaEvents.filter(event => event.day === parsedDay)

      if (!nerdearlaTalksByDay.length) return console.log('No hay charlas para tal día')
      nerdearlaTalksByDay.forEach(event => console.log(event))
    },
    // Podemos pedirle a la CLI por un tipo de charla en particular: tecnica, rrhh, o workshop
    talks: type => {
      const nerdearlaTalksByType = nerdearlaEvents.filter(event => event.type === type)

      if (!nerdearlaTalksByType.length) return console.log('No hay charlas de tal tipo')
      nerdearlaTalksByType.forEach(event => console.log(event))
    },
  }

  // Inicializamos la CLI
  fire(nerdearlaCli)
}

main()
