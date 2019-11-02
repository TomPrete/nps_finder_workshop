# National Park Finder

## What we're building

We will be building a Single Page Application (SPL) using HTML, Javascript, and Bootstrap for styling. This application will utilize three (3) API's, Google Maps Embed API, National Park Services API, and Dark Sky's API for weather (Application Programming Interface).

Application User Flow:
1. The user will search for a National Park in a Text Input Field (by name or by state) and click SUBMIT
2. We will retrieve and display a list of National Parks based on your search query.
3. The list of National Parks will have 3 buttons on them, a button that links to the National Parks' website, a button that will display a Google Map of the National Park, and a button that will display the National Park's weather if applicable.

## What you’ll learn today. 

1. You’ll learn how to Use API’s (Google Maps, National Parks, Dark Sky)
2. You’ll learn how to manipulate data that’s retrieved from an API using Javascript
3. You’ll learn how to manipulate the DOM (Webpage) using Javascript
4. Many other things…

## Before We Begin

1. Ensure you have [Google Chrome](https://www.google.com/chrome/) downloaded.
2. Ensure you have a GMail  email Account to get access to the Google Maps Embed API
3. Please copy and download the following folder files from Google Drive. [US National Parks](https://drive.google.com/drive/folders/1IvmrYFqkl4ICGQqhSK_0JoEZ2EAFrZlR?usp=sharing)  
4. Download a text editor to write your code in. I like to use VSCode. You can download it [here](https://code.visualstudio.com/download)


## Our Application File Structure

After downloading the US National Parks folder from the Google Drive and unzipping it. There should be 2 files (`app.js`, `index.html`) and an `assets` folder. 

1. The `index.html` file:
    1. This HTML file is the main entry point to our application. We’ll open this file in the web browser.
2. The `app.js` file:
    1. This Javascript file is where we’ll be performing all the logic of the application. Including getting data from the API’s
3. The `assets` folder:
    1. This is where we’re storing our assets for our application. Like images. 
