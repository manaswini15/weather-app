console.log('Client side JS file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value

    document.getElementById('message-1').style.color = 'black' ;
    messageOne.textContent ='Loading...'
    messageTwo.textContent = ''

    if(location === ''){
        document.getElementById('message-1').style.color = 'red' ;
        messageOne.textContent = '*Enter location*'
        return 
    }

    fetch('http://localhost:3000/weather?address='+ encodeURIComponent(location)).then((response) => {
    response.json().then((data) => {
        if(data.error){
            document.getElementById('message-1').style.color = 'red' ;
            messageOne.textContent = data.error
            // console.log(data.error)    
        } 
        else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        // console.log(data.location)
        // console.log(data.forecast)
        }
    })
    
})
})

