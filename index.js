const imgAuthor = document.getElementById('img-author')
const crypto = document.getElementById('crypto')
const cryptoPrice = document.getElementById('crypto-price')
const currTime = document.getElementById('curr-time')
const weatherIcon = document.getElementById('weather-icon')
const weatherCity = document.getElementById('weather-city')
const quotesText = document.getElementById('quotes-text');
const quotesAuthor = document.getElementById('quotes-author')

fetch('https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature')
.then((response) => response.json())
.then((data) => {
    console.log(data)
    let url;
    url = data.urls.full
    document.body.style.background = `url(${url})`
    imgAuthor.innerHTML = `<h2>By: ${data.user.name}</h2>`
})
.catch(err => {
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`
    // Report the error to some kind of service
})

fetch('https://api.coingecko.com/api/v3/coins/ethereum')
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    crypto.innerHTML = `<img src="${data.image.small}"> ${data.name}`
    cryptoPrice.innerHTML = `<span>🎯:${data.market_data.current_price.usd}</span><span>👆:${data.market_data.high_24h.usd}</span><span>👇:${data.market_data.low_24h.usd}</span>`
});




function getCurrentTime() {
    const date = new Date()
   currTime.textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime,1000)

navigator.geolocation.getCurrentPosition((position) => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lon=${position.coords.longitude}&lat=${position.coords.latitude}&units=imperial`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)

    weatherIcon.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'/>
                         <p>${data.main.temp}<sup>o</sup>C</p>
                         `
    weatherCity.innerHTML =`<h2>${data.name}</h2>`
});
  });

 
function getQuotes(){
    fetch('https://type.fit/api/quotes')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      let rand = Math.floor(Math.random()*data.length)
      quotesAuthor.innerHTML = `<h3>- ${data[rand].author}</h3>`
      quotesText.innerHTML =`<p>${data[rand].text}</p>`
  });
}
getQuotes()
setInterval(getQuotes, 6000)