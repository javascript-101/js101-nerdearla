console.log('Checkpoint 1')

axios
  .get('https://devday-ar.com/')
  .then(response => {
    console.log(response.data)
    console.log('Checkpoint 2')
  })
  .catch(error => {
    console.log(error.message)
    console.log('Checkpoint 3')
  })

Promise.resolve(123).then(valor => console.log(valor))
Promise.reject(123).catch(valor => console.log(valor))

new Promise((resolve, reject) => {
  if (Math.random() < 0.5) {
    resolve('todo bien')
  } else {
    reject('todo mal')
  }
})
  .then(valor => console.log(valor))
  .catch(error => console.log(error))
