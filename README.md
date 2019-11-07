# National Park Finder

## What we're building

We will be building a Single Page Application (SPL) using HTML, Javascript, and the Bootstrap styling framework for styling. This application will utilize three (3) API's, Google Maps Embed API, National Park Services API, and Dark Sky's API for weather (Application Programming Interface).

Application User Flow:
1. The user will search for a National Park in a Text Input Field (by name or by state) and click SUBMIT.
2. We will retrieve and display a list of National Parks based on your search query.
3. The list of National Parks will have 3 buttons on them, a button that links to the National Parks' website, a button that will display a Google Map of the National Park, and a button that will display the National Park's weather if applicable.

## What you’ll learn today.

1. You’ll learn how to Use API’s (Google Maps, National Parks, Dark Sky).
2. You’ll learn how to manipulate data that’s retrieved from an API using Javascript.
3. You’ll learn how to manipulate the DOM (Webpage) using Javascript.
4. Many other things…

## Before We Begin

1. Ensure you have [Google Chrome](https://www.google.com/chrome/) downloaded.
2. Ensure you have a GMail  email Account to get access to the Google Maps Embed API.
3. Please copy and download the following folder files from Google Drive. [US National Parks](https://drive.google.com/drive/folders/1IvmrYFqkl4ICGQqhSK_0JoEZ2EAFrZlR?usp=sharing).
4. Download a text editor to write your code in. I like to use VSCode. You can download it [here](https://code.visualstudio.com/download)


## Our Application File Structure

After downloading the US National Parks folder from the Google Drive and unzipping it. There should be 2 files (`app.js`, `index.html`) and an `assets` folder.

1. The `index.html` file:
    1. This HTML file is the main entry point to our application. We’ll open this file in the web browser.
2. The `app.js` file:
    1. This Javascript file is where we’ll be performing all the logic of the application. Including getting data from the API’s.
3. The `assets` folder:
    1. This is where we’re storing our assets for our application. Like images and other file types.

There is a base of code in the `index.html` and `app.js` files that we’ll build upon.

## Let’s Get Started

Open up the `index.html` file in Google Chrome. You can right click on the `index.html` file and ‘open with’ Google Chrome or you can click and hold and drag the file into an already open Google Chrome browser.

Your application should appear in the web browser. In the URL of Google Chrome should say the file path to your application. (Ex: **_file:///Users/taprete/us_national_parks/index.html_** - this is file path to my `index.html` file)

In the navigation bar there should be the National Parks logo with a title of NATIONAL PARK SEARCHER and a search box that says *Search for National Parks* and a button that says **Get Parks**

Typing in the Search field and clicking **Get Parks** currently doesn’t do anything since we haven’t programmed our application to get the National Parks from the NPS API. In fact we’ are not even running our `app.js` file yet. We want our `app.js` file to load as soon as our `index.html` file loads.

### Linking our `app.js` file our `index.html` file

__In our `index.html` file:__
There will be a comment as to where we should add our `app.js` file.
```html
  <script src="" async defer></script> <!-- add our 'app.js' file to the 'src' attribute -->
```

After you add your `app.js` file to the `<script>` tag it should look like the following:
```html
  <script src=“app.js” async defer></script> <!-- add our 'app.js' file to the 'src' attribute -->
```

Once you’ve added your `app.js` file to your `index.html` Refresh your page. __DON’T FORGET TO SAVE!__

### The Chrome Developer Tools

Web developers often log messages to the Console to make sure that their JavaScript is working as expected. To log a message, you insert an expression like `console.log('Hello Hackers!’)` into your JavaScript. When the browser executes your JavaScript (like when you load your `index.html` file) and sees an expression like that, it knows that it's supposed to log the message to the Console. - _Google Documentation_

__How to Open the Console panel to view logged messages or run JavaScript:__

Press `Command+Option+J` (Mac) or `Control+Shift+J` (Windows, Linux, Chrome OS) to jump straight into the Console panel.

__Open DevTools from Chrome's main menu:__

Click __Customize and control Google Chrome__ (the 3 vertical dots in the upper right hand corner of the Chrome Web Browser) and then select __More Tools > Developer Tools__. Navigate to the __Console__ tab.

If your `app.js` file was loaded correctly into your HTML file when your refresh your `index.html` page with the Chrome Dev Tools Console panel open you should see 2 things printed, `Hello Hacker!` and the file path to your `index.html` file (Ex: `file:///Users/taprete/us_national_parks/index.html`)

Let’s open up the `app.js` file in our Text Editor (VSCode). You can see on the first two lines of `app.js` we have two console.logs: `console.log('Hello Hackers!’)` and `console.log(location.href)`. This is what’s being printed out in our Console.

## Release 1: Getting National Park Data and Displaying National Parks

For Release 1 we’ll be using the National Park’s API to get National Parks based on our search query.

First, we’ll need to get an API key to use the NPS API. Visit the NPS [Get Started](https://www.nps.gov/subjects/developer/get-started.htm) page and Signup to receive an API Key to access National Park Service Data.

Once you sign up you should receive an email with your API Key. Your API key is a unique identifier used to authenticate you when you’re making API Calls.

You should receive an email that looks something like this from __Your National Park Service API key__
```
Your API key for __YOUR EMAIL is:
YOUR API KEY SHOULD DISPLAY HERE
You can start using this key to make web service requests. Simply pass your key in the URL when making a web request. Here's an example:
https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=YOUR_API KEY SHOULD DISPLAY HERE
For additional support, please contact us. When contacting us, please tell us what API you're accessing and provide the following account details so we can quickly find you:
```
In our `app.js` file lets assign the variable `NPS_API` to equal our NPS service API that we received in our email. The API should be a string.

Before:
```javascript
const NPS_API = 'YOUR_NPS_API'
```

After:
```javascript
const NPS_API = 'xkhVti9P………………….’  // The entire API that is unique to you
```

When we click on the Get Parks button we want to grab National Park Data.

Click on the Get Parks button and see what prints out in the Console. It should print `Search for national parks…`.  Where is the function being executed in our `app.js` file?

In the function named `getNpsData` is where we’ll be getting all the National Park data.

`getNpsData` Function:
```javascript
// GET NATIONAL PARK SERVICE DATA
function getNpsData(event) {
  event.preventDefault()
  console.log("Search for national parks...")
  // write your code here
}

```

After:
```javascript
// GET NATIONAL PARK SERVICE DATA
function getNpsData(event) {
    event.preventDefault()
    let npsElement = document.getElementById('national-parks')
    npsElement.innerHTML = loadingJumbo // Shows a loading status
    let search = event.target.elements[0].value // Grabs the search query
    if (search.length) { // Conditional logic in case No Results are returned.
      fetch(`https://developer.nps.gov/api/v1/parks?parkCode=&q=${search}&fields=images&api_key=${NPS_API}`)
        .then(res =>
          res.json()
        )
        .then(data => {
          let npsElement = document.getElementById('national-parks')
          if (data.data.length === 0) { // Conditional logic in case No Results are returned.
            return npsElement.innerHTML = 'Your search returned 0 results'
          }
          npsElement.innerHTML = ''
          console.log(data.data)
        })
    } else return npsElement.innerHTML = alert
  }
```

Look in the Console. You should get back data! __Woooooo!__

How is this happening?

1. First, we check to see if we have anything in the search field with the `if` statement.
2. Then we use our API to `fetch` data from NPS’s API endpoint.
3. We get a response but it’s not in the format we can use, so we turn the response into JSON (Javascript Object Notation).
4. Then we perform some more conditional logic to ensure there is actual data being received with another `if` statement.
5. Then we `console.log(data)` the data to show up in the console.


__But how do we get it to display on the Webpage?__

First, there is a lot of data being returned per National Park, way more than we actually need. So we’ll want to only grab the specific data from the National Park that we need in to display or use for other parts of the application. We’ll want to *clean* the data.

### Cleaning the data

Let’s write another function that’s responsible for *cleaning* the data. (only grabbing the data that we want)

There’s a function named `cleanNpsData` already declared.

```javascript
// CLEAN NPS DATA
function cleanNpsData(data) {
  console.log(data)
  // write your code here
}
```

In the `cleanNpsData` function is where we’ll parse out data returned from the National Parks API and only grab the data we want. But first in our `getNpsData` functions let’s pass the `data` that’s being passed into the `console.log(data.data)` and instead pass it into our `cleanNpsData` function and assign that to a variable.

In our `getNpsData` function:
```javascript
// GET NATIONAL PARK SERVICE DATA
function getNpsData(event) {
  event.preventDefault()
  let npsElement = document.getElementById('national-parks')
  npsElement.innerHTML = loadingJumbo // Shows a loading status.
  let search = event.target.elements[0].value // Grabs the search query.
  if (search.length) { // Conditional logic in case No Results are returned.
    fetch(`https://developer.nps.gov/api/v1/parks?parkCode=&q=${search}&fields=images&api_key=${NPS_API}`)
      .then(res =>
        res.json()
      )
      .then(data => {
        let npsElement = document.getElementById('national-parks')
        if (data.data.length === 0) { // Conditional logic in case No Results are returned.
          return npsElement.innerHTML = 'Your search returned 0 results'
        }
        let cleanData = cleanNpsData(data.data) // Here is where we’re calling the 'cleanupsData' function and assigning it to a variable called 'cleanData'
        npsElement.innerHTML = ''
        console.log(cleanData) // Will print the 'cleanData' variable which should only show the 'img', 'text', 'url', & 'title'
      })
  } else return npsElement.innerHTML = alert
}
```

Next, in our `cleanNpsData` function lets loop through the data and extract only the data that we want. We only want the `fullName`, `description`,  the `image` url, and the park’s `url` for the time being.

We’re going to also be including a `googleMapUrl` and the `latLong` in the data but right now those two are commented out. We’ll get to those at a later.

After (`cleanNpsData`):
```javascript
// CLEAN NPS DATA
function cleanNpsData(data) {
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    let park = {}
    park['title'] = data[i].fullName
    park['text'] = data[i].description
    park['img'] = data[i].images.length ? data[i].images[0].url : 'file:///Users/taprete/us_parks_workshop/assets/bear_in_park.png'
    park['url'] = data[i].url
    // park['googleMapUrl'] = createGoogleMapUrl(data[i].fullName)
    // if (data[i].latLong !== '') {
    //   park['latLong'] = getLatLong(data[i].latLong)
    // }
    nationalParks.push(park)
  }
  return nationalParks
}
```

Refresh your page and search for something like __seattle__ or __oregon__ and see what displays in our Console.

Example Search for `Seattle`:
```js
[
  {
    "img": "https://www.nps.gov/common/uploads/structured_data/3C796968-1DD8-B71B-0B0104B6AE13AEC3.jpg",
    "text": "After surviving a devastating fire and an economic depression, Seattle flourished with the Klondike Gold Rush. As a key port city, merchants supplied would-be Klondike Kings and Queens on their way to Alaska. This cemented Seattle as an anchor of the Pacific Northwest. Today the park is your gateway to learn about the gold rush, explore Seattle area parks, and be involved with the local community.",
    "title": "Klondike Gold Rush - Seattle Unit National Historical Park",
    "url": "https://www.nps.gov/klse/index.htm"
  },
  {
    "img": "https://www.nps.gov/common/uploads/structured_data/3C7A599D-1DD8-B71B-0BBDC12BEC5107B5.jpg”,
    "text": "Less than three hours from Seattle, an alpine landscape beckons. Discover communities of life adapted to moisture in the west and recurring fire in the east. Explore jagged peaks crowned by more than 300 glaciers. Listen to cascading waters in forested valleys. Witness a landscape sensitive to the Earth's changing climate. Help steward the ecological heart of the Cascades.",
    "title": "North Cascades National Park",
    "url": "https://www.nps.gov/noca/index.htm"
  }
]

```