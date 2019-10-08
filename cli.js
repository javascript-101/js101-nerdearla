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

const axios = require('axios');
const cheerio = require('cheerio');

const main = async () => {
  // Obtenemos el HTML de nerder.la/agenda
  const { data } = await axios.get('https://nerdear.la/agenda/');

  // Lo pasamos por Cheerio para poder obtener elementos del mismo
  const $ = cheerio.load(data);

  // Obtenemos cada una de las cajas largas que contienen los workshops/charlas
  const days = $('ul.scheduleday_wrapper');

  // Pensar que estructura queremos lograr
  // Por ej:
  /*
    {
      days: {
        one: {
          cognizantRoom: {},
          openQubeRoom: {},
          sysArmyRoom: {}
        },
        two: {
          cognizantRoom: {},
          openQubeRoom: {},
          sysArmyRoom: {}
        },
        three: {
          cognizantRoom: {},
          openQubeRoom: {},
          sysArmyRoom: {}
        },
      }
    }
  */

  const titles = [];
  days.each((_, element) => {
    const title = $(element)
      .find('.scheduleday_title')
      .text();
    titles.push(title);
  });
  console.log('TCL: main -> demo', titles);
};

main();

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
