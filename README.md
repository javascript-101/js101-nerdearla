---
description: Armando una CLI con Node.js
---

# Javascript101

{% hint style="warning" %}
🧙♂**Requisitos**

* Editor de texto \(VScode, Sublime, Atom, Vim 👀, etc\)
* Node instalado
* Ganas de aprender 🤯
{% endhint %}

## Dinámica

1. Inicializaremos nuestro proyecto con npm.
2. Instalamos las dependencias necesarias.
3. Crearemos un archivo llamado `cli.js`  que será el que tendrá toda la lógica de nuestra CLI.
4. Por cada paso de los proyectos vamos a hacer una introducción a cada tema.

## Temas que vamos a ver ✨

* Strings, arrays y objetos.
* Como definir e invocar [**funciones**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)**.**
* Cómo usar [**forEach**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) para recorrer un array.
* Cómo definir constantes usando [**const**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) y variables usando [**let**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let).
* Cómo utilizar [**async/await**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) para obtener datos de una API.
* Cómo utilizar [_**axios**_](https://github.com/axios/axios)_._
* Cómo utilizar [**cheerio**](https://cheerio.js.org/) ****para [_**scraping**_](https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/)_._

## Let's get started 🤓

{% tabs %}
{% tab title="1. Inicializamos nuestro proyecto" %}
{% hint style="success" %}
### 📚Conceptos

* Trabajando con npm registry
* const
{% endhint %}

### Introducción

* Creamos una carpeta llamada `javascript101`.
* Nos paramos en esa carpeta y abrimos nuestra terminal.
* Vamos a inicializar nuestro proyecto utilizando

```bash
$ npm init -y
```

> _**👉🏻**_Para saber más sobre el comando _****_[_**https://docs.npmjs.com/cli/init**_](https://docs.npmjs.com/cli/init)_\*\*\*\*_

{% hint style="info" %}
Este comando nos brinda opciones para configurar nuestro proyecto, para conocer un poco más sobre estas configuraciones te recomendamos la documentación oficial [**https://docs.npmjs.com/files/package.json**](https://docs.npmjs.com/files/package.json)\*\*\*\*
{% endhint %}

### Instalando dependencias

Gracias a npm vamos a tener disponible una larga lista de paquetes o módulos de Node para sumar a nuestro proyecto.

> Para entender un poco más acerca de esto te recomendamos que leas la documentación oficial de **npm registry 👉🏻**[**https://docs.npmjs.com/about-packages-and-modules**](https://docs.npmjs.com/about-packages-and-modules)

* Agreguemos como dependencia a [**axios**](https://www.npmjs.com/package/axios) para poder hacer un request GET ****y obtener la página de nerdearla.

```bash
$ npm i axios
```

* Vamos a necesitar [**cheerio**](https://www.npmjs.com/package/cheerio) para iniciar con nuestro scraping y obtener elementos de manera similar que lo hacemos con jQuery.

```bash
$ npm i cheerio
```

* Instalemos también [**nodemon**](https://www.npmjs.com/package/nodemon) ****como dependencia de desarrollador para estar escuchando los cambios en nuestro JS y volver a ejecutar Node.js sobre el mismo

```bash
$ npm i -D nodemon
```

### Utilizando dependencias

Para poder utilizar las dependencias que instalamos anteriormente vamos a ir a nuestro archivo .js y  ****cargarlas:

{% code-tabs %}
{% code-tabs-item title="cli.js" %}
```javascript
const axios = require('axios');
const cheerio = require('cheerio');
```
{% endcode-tabs-item %}
{% endcode-tabs %}
{% endtab %}

{% tab title="2. Sumandole lógica a nuestra CLI" %}
{% hint style="success" %}
### 📚Conceptos

* Arrow functions
* Async/await
{% endhint %}

### Introducción

* Antes de empezar a cranear nuestra CLI veamos algunos conceptos importantes que necesitamos tener en cuenta para seguir 

### **Arrow functions** 🏹 

* Las **arrow functions** o funciones nos permiten reducir código y trabajar con funciones de manera más amigable. También se las conoce como anónimas.

#### Sintaxis 

```javascript
(param1, param2, …, paramN) => { sentencias }
(param1, param2, …, paramN) => expresion
() => { sentencias }
```

#### Ejemplo

```javascript
const elementos = [
  "Hidrógeno",
  "Helio",
  "Litio",
  "Beril­io"
];

elementos.map(function(elemento){ 
    return elemento.length;
});  // [8, 6, 7, 9]

elementos.map((elemento) => {
  return elemento.length;
}); // [8, 6, 7, 9]

elementos.map(({length}) => length); // [8, 6, 7, 9]
```

{% hint style="info" %}
Para conocer un poco más sobre **arrow functions** te recomendamos este link de MDN 💛 

👉🏻[Arrow functions](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Funciones/Arrow_functions)
{% endhint %}

### Async/await 🤟🏻

* Las funciones `async`/`await` nos hacen la vida más fácil a la hora de trabajar con el uso asíncrono de promesas en Javascript. 

#### Sintaxis 

```javascript
async function name([param[, param[, ... param]]]) {
   statements
}
```

#### Ejemplo

```javascript
async function functionName (arguments) {
  // Do something asynchronous
}

const functionName = async (arguments) => {
  // Do something asynchronous
}

```

#### Uso de `await`

* Cuando manejamos promesas solemos utilizar `then`, en este caso la sentencia `await` nos permite "esperar" a que esta promesa se resuelva para seguir con el proceso ya que nos retorna el parámetro que se pasa en el `then`.

#### Ejemplo

```javascript
// then
const getOne = async () => { 
  return 1;
} 
  
getOne()
  .then(value => {
    console.log(value); // 1
  })

// await
const test = async () => {
  const one = await getOne()
  console.log(one) // 1
}

test()
```

### Ejercicio 1

* Vamos a crear una función `main()` para poder correr nuestra cli principal.

{% code-tabs %}
{% code-tabs-item title="cli.js" %}
```javascript
const axios = require('axios');
const cheerio = require('cheerio');

const main = async () => {};

main();
```
{% endcode-tabs-item %}
{% endcode-tabs %}

1. Dentro de nuestra función vamos a hacer un GET con axios para obtener el HTML de la agenda de nerdearla que vive en [https://nerdear.la/agenda/](https://nerdear.la/agenda/)
{% endtab %}
{% endtabs %}













