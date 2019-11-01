console.log('HELLO!')
console.log(location)

const darkSkyUrl = 'https://api.darksky.net/forecast/2699e5a273b29856b30144609fc7c590/'
const GOOGLE_MAPS_API = 'AIzaSyDBtDxCzzbsoDCKE328mM-VWU7TZOqBRy4'
const NPS_API = 'xkhVti9Pzrqz4Pn4vOzWnTR3BmJimj5Qnu9HrQJG'
const proxy = 'https://cors-anywhere.herokuapp.com/'
let nationalParks = []

document.getElementById('form').addEventListener('submit', getNpsData)

// WEATHER IMAGES
const images = {
  'cloudy': 'file:///Users/taprete/us_parks_workshop/assets/cloudy-day-3.svg',
  'day': 'file:///Users/taprete/us_parks_workshop/assets/day.svg'
}

// HELPER FUNCTIONS
let helperFunctions = {
  // DISPLAY MAP ON SCREEN
  'displayMap': (googleMapUrl) => {
    let map = document.getElementById('i-frame')
    window.scrollTo(0,0)
    map.innerHTML = `<iframe width='1000' height='750'frameborder='0' style='border:0'
    src='${googleMapUrl}' allowfullscreen></iframe>`
  },
  // GET WEATHER DATA
  'getWeatherData': async (lat, long) => {
    console.log(lat, long)
    if (lat !== undefined || long !== undefined) {
      let response = await fetch(`${proxy}${darkSkyUrl}${lat},${long}`)
      let data = response.json()
      return data
    } else {
      return {'response': 'No weather data available'}
    }
  },
  // DISPLAY WEATHER ON SCREEN
  'displayWeather': (data) => {
    console.log(data)
    let targetElement = document.getElementById('weather')
    window.scrollTo(0,0)
    targetElement.innerHTML = ''
    let degreeNode = document.createElement('h1')
    let imageNode = document.createElement('img')
    imageNode.setAttribute('src', images.cloudy)
    imageNode.setAttribute('height', '200px')
    imageNode.setAttribute('width', '200px')
    imageNode.setAttribute('alt', 'this is an image')
    targetElement.appendChild(degreeNode).innerHTML = `${data.currently.summary} and ${Math.round(data.currently.temperature)} degress F`
    targetElement.appendChild(imageNode)
  }
}

// CREATE A NATIONAL PARK CARD ON SCREEN
function createCard(id=1, title = 'TITLE', text = 'Card Text', parkImage='file:///Users/taprete/us_parks_workshop/assets/yellowstone_one.jpg', googleMapUrl, url, latLong=undefined, helperFunctions) {
  console.log(latLong)

  let smallCard = document.createElement('div')
  smallCard.setAttribute('class', 'col-sm-4')
  smallCard.setAttribute('style', 'margin-top: 20px')

  let card = document.createElement('div')
  card.setAttribute('class', 'card')
  card.setAttribute('style', 'width: 18rem;')

  let image = document.createElement('img')
  image.setAttribute('src', parkImage)
  image.setAttribute('class', 'card-img-top')
  image.setAttribute('alt', 'this is an image')

  let cardBody = document.createElement('div')
  cardBody.setAttribute('class', 'card-body')

  let cardTitle = document.createElement('h5')
  cardTitle.setAttribute('class', 'card-title')

  let cardText = document.createElement('p')
  cardText.setAttribute('class', 'card-text')

  let link = document.createElement('a')
  link.setAttribute('class', 'btn btn-primary btn-lg mx-2')
  link.setAttribute('href', `${url}`)
  link.setAttribute('target', '_blank')

  let mapButton = document.createElement('button')
  mapButton.setAttribute('id', `map-${id}`)
  mapButton.setAttribute('type', 'button')
  mapButton.setAttribute('class', 'btn btn-primary btn-lg')

  cardBody.appendChild(cardTitle).innerHTML = title
  cardBody.appendChild(cardText).innerHTML = text
  cardBody.appendChild(link).innerHTML = 'Website'
  cardBody.appendChild(mapButton).innerHTML = 'View Map'

  card.appendChild(image)
  card.appendChild(cardBody)
  smallCard.appendChild(card)

  if (latLong !== undefined) {
    let weatherButton = document.createElement('button')
    weatherButton.setAttribute('id', `weather-${id}`)
    weatherButton.setAttribute('type', 'button')
    weatherButton.setAttribute('class', 'btn btn-primary btn-lg m-2')
    cardBody.appendChild(weatherButton).innerHTML = 'View Weather'
    // ONCLICK GETS WEATHER AND DISPLAYS WEATHER
    weatherButton.onclick =  async () => {
      let weatherData = await helperFunctions.getWeatherData(latLong[0], latLong[1])
      helperFunctions.displayWeather(weatherData)
    }
  }

  // ONCLICK RUNS DISPLAY MAP
  mapButton.onclick = function() {
    helperFunctions.displayMap(googleMapUrl)
  }

  return smallCard
}

// CREATE GOOGLE MAP URL
function createGoogleMapUrl(title) {
  var modifiedTitle = title.replace(/ /g, '+')
  var modifiedTitle = modifiedTitle.replace(/&/g, 'and')
  let googleMapUrl = `https://www.google.com/maps/embed/v1/place?q=${modifiedTitle}&key=${GOOGLE_MAPS_API}`
  return googleMapUrl
}

// LOADING NATIONAL PARKS MESSAGE
let loadingJumbo = `<div class='jumbotron jumbotron-fluid col-12'>
<div class='container'>
  <h1 class='display-4'>Loading National Parks... <div class='spinner-grow' style='width: 3rem; height: 3rem;' role='status'>
  <span class='sr-only'>Loading...</span>
  </div></h1>
</div>
</div>`

// ALERT WHEN NO TEXT IS ENTERED
let alert = `
<div class='alert alert-primary col-12' role='alert'>
  Please enter in the search field
</div>`



// GET NATIONAL PARK SERVICE DATA
function getNpsData(event) {
  event.preventDefault()
  let googleMapElement = document.getElementById('google-map')
  let clearMap = document.getElementById('i-frame')
  clearMap.innerHTML = ''
  googleMapElement.innerHTML = loadingJumbo
  let search = event.target.elements[0].value
  if (search.length) {
    fetch(`https://developer.nps.gov/api/v1/parks?parkCode=&q=${search}&fields=operatingHours&fields=entranceFees&fields=addresses&fields=images&api_key=${NPS_API}`)
      .then(res =>
        res.json()
      )
      .then(data => {
        let googleMapElement = document.getElementById('google-map')
        if (data.data.length === 0) {
          return googleMapElement.innerHTML = 'Your search returned 0 results'
        }
        // console.log('DATA: ', data.data)
        let cleanData = cleanNpsData(data.data)
        googleMapElement.innerHTML = ''
        for (let i = 0; i < cleanData.length; i++) {
          // console.log('CLEAN DATA: ', cleanData[i])
          let title = cleanData[i].title
          let text = cleanData[i].text
          let img = cleanData[i].img
          let url = cleanData[i].url
          let latLong = cleanData[i].latLong

          let googleMapUrl = cleanData[i].googleMapUrl
          console.log("LAT ", latLong)
          googleMapElement.appendChild(createCard(i, title, text, img, googleMapUrl, url, latLong, helperFunctions))
        }
      })
  } else return targetElement.innerHTML = alert
}

// FORMATS LATITUDE AND LONGITUDE
function getLatLong(latLong) {
  const location = latLong.split(/[,:]/mg)
  return [+location[1], +location[3]]
}

// CLEAN NPS DATA
function cleanNpsData(data) {
  for (let i = 0; i < data.length; i++) {
    let park = {}
    park['title'] = data[i].fullName
    park['text'] = data[i].description
    park['img'] = data[i].images.length ? data[i].images[0].url : 'file:///Users/taprete/us_parks_workshop/assets/bear_in_park.png'
    park['url'] = data[i].url
    park['googleMapUrl'] = createGoogleMapUrl(data[i].fullName)
    if (data[i].latLong !== '') {
      park['latLong'] = getLatLong(data[i].latLong)
    }
    nationalParks.push(park)
  }
  return nationalParks
}
