console.log('Client side javascript loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit',event=>{
  event.preventDefault()

  message1.textContent = 'Loading...'
  message2.textContent = ''
  const location = search.value
  fetch(`/weather?address=${location}`).then(response=>{
  response.json().then(data=>{
    if(data.error){
      // message1.textContent = data.error
      message1.textContent = 'Unable to find location'
      message2.textContent = 'Try another search'
    } else {
      message1.textContent = data.location
      message2.textContent = data.forecast
    }
  })
})


})