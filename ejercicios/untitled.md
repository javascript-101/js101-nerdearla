# 1. Inicializamos nuestro proyecto

{% hint style="success" %}
## 📚Conceptos

* Trabajando con npm registry
* const
{% endhint %}

## Introducción

* Creamos una carpeta llamada `javascript101`.
* Nos paramos en esa carpeta y abrimos nuestra terminal.
* Vamos a inicializar nuestro proyecto utilizando

```bash
$ npm init -y
```

{% hint style="info" %}
_Para saber más sobre el comando  👉🏻_ [**https://docs.npmjs.com/cli/init**](https://docs.npmjs.com/cli/init)\*\*\*\*

Este comando nos brinda opciones para configurar nuestro proyecto, para conocer un poco más sobre estas configuraciones te recomendamos la documentación oficial [**https://docs.npmjs.com/files/package.json**](https://docs.npmjs.com/files/package.json)
{% endhint %}



## Instalando dependencias

Gracias a npm vamos a tener disponible una larga lista de paquetes o módulos de Node para sumar a nuestro proyecto.

{% hint style="info" %}
Para entender un poco más acerca de esto te recomendamos que leas la documentación oficial de **npm registry 👉🏻**[**https://docs.npmjs.com/about-packages-and-modules**](https://docs.npmjs.com/about-packages-and-modules)
{% endhint %}

* Agreguemos como dependencia a [**axios**](https://www.npmjs.com/package/axios) para poder hacer un request GET _\*\*_y obtener la página de nerdearla.

```bash
$ npm i axios
```

{% hint style="info" %}
**🔎**[**https://www.npmjs.com/package/axios**](https://www.npmjs.com/package/axios)\*\*\*\*
{% endhint %}

* Vamos a necesitar [**cheerio**](https://www.npmjs.com/package/cheerio) para iniciar con nuestro scraping y obtener elementos de manera similar que lo hacemos con jQuery.

```bash
$ npm i cheerio
```

{% hint style="info" %}
🔎[**https://www.npmjs.com/package/cheerio**](https://www.npmjs.com/package/cheerio)\*\*\*\*
{% endhint %}

* Instalemos también [**nodemon**](https://www.npmjs.com/package/nodemon) _\*\*_como dependencia de desarrollador para estar escuchando los cambios en nuestro JS y volver a ejecutar Node.js sobre el mismo

```bash
$ npm i -D nodemon
```

{% hint style="info" %}
🔎[**https://www.npmjs.com/package/nodemon**](https://www.npmjs.com/package/nodemon)\*\*\*\*
{% endhint %}

## Paso 1

### Utilizando dependencias

Para poder utilizar las dependencias que instalamos anteriormente vamos a ir a nuestro archivo .js y cargarlas:

{% code-tabs %}
{% code-tabs-item title="cli.js" %}
```javascript
const axios = require('axios');
const cheerio = require('cheerio');
```
{% endcode-tabs-item %}
{% endcode-tabs %}

