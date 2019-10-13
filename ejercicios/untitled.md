# 1. Inicializamos nuestro proyecto




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


```javascript
const axios = require('axios');
const cheerio = require('cheerio');
```
