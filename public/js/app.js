console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log('Getting weather for: '+search.value)
    messageOne.textContent = 'Getting weather for: '+search.value

    locURL = '/weather?address='+search.value
    fetch(locURL).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if (data.error) {
                console.log(data.error)
                messageTwo.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.summary)
                messageTwo.textContent = data.summary
                messageThree.textContent = data.lowhightemp
            }
        })
    })
    
})