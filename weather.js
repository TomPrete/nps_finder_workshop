console.log('WEATHER')


const images = [
  'file:///Users/taprete/milspouse_coders_workshop/assets/cloudy-day-1.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/cloudy-day-2.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/cloudy-day-3.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/cloudy-night-1.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/cloudy-night-2.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/cloudy.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/day.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/night.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/rainy-1.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/rainy-2.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/rainy-3.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/rainy-4.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/rainy-5.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/rainy-6.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/snowy-1.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/snowy-2.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/snowy-3.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/snowy-4.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/snowy-5.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/snowy-6.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/thunder.svg',
  // 'file:///Users/taprete/milspouse_coders_workshop/assets/weather_sunset.svg',
  // 'file:///Users/taprete/milspouse_coders_workshop/assets/weather-sprite.svg',
  // 'file:///Users/taprete/milspouse_coders_workshop/assets/weather.svg'
]


let mainNode = document.getElementById('weather')
for (let i=0; i<images.length;i++) {
  let imageNode = document.createElement('img')
  console.log(`${i}: ${images[i]}`)
  imageNode.setAttribute('src', images[i])
  imageNode.setAttribute('height', '200px')
  imageNode.setAttribute('width', '200px')
  imageNode.setAttribute('alt', 'this is an image')
  mainNode.appendChild(imageNode)

}


const images = {
  'partly-cloudy-day': 'file:///Users/taprete/milspouse_coders_workshop/assets/cloudy-day-3.svg',
  'file:///Users/taprete/milspouse_coders_workshop/assets/cloudy-night-1.svg',
  'partly-cloudy-night':'file:///Users/taprete/milspouse_coders_workshop/assets/cloudy-night-2.svg',
  'cloudy': 'file:///Users/taprete/milspouse_coders_workshop/assets/cloudy.svg',
  'fog': 'file:///Users/taprete/milspouse_coders_workshop/assets/cloudy.svg',
  'wind': 'file:///Users/taprete/milspouse_coders_workshop/assets/cloudy.svg',
  'clear-day': 'file:///Users/taprete/milspouse_coders_workshop/assets/day.svg',
  'clear-night':'file:///Users/taprete/milspouse_coders_workshop/assets/night.svg',
  'drizzle': 'file:///Users/taprete/milspouse_coders_workshop/assets/rainy-4.svg',
  'rain': 'file:///Users/taprete/milspouse_coders_workshop/assets/rainy-5.svg',
  'snow':'file:///Users/taprete/milspouse_coders_workshop/assets/snowy-5.svg',
  'sleet':'file:///Users/taprete/milspouse_coders_workshop/assets/snowy-6.svg',
  'thunder':'file:///Users/taprete/milspouse_coders_workshop/assets/thunder.svg',
  'tornado':'file:///Users/taprete/milspouse_coders_workshop/assets/weather.svg',
}
