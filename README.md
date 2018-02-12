# imagesearch

**Deployed example [here](ADD).**

## What it does
Returns an array of image objects for a given search term.

Use `?offser=x` to set the number of results you would like returned.

## Output example

**Passing this:**

`www.example.com/api/imagesearch/cow?offset=2`

**Returns this:**

`[{"url":"https://farm1.staticflickr.com/379/32609476681_16765aab14_z.jpg","snippet":"Cows","thumbnail":"https://farm1.staticflickr.com/379/32609476681_16765aab14_q.jpg","context":"https://www.flickr.com/photos/135894189@N07/32609476681"},{"url":"https://farm5.staticflickr.com/4276/34267350114_7913cee737_z.jpg","snippet":"Cow","thumbnail":"https://farm5.staticflickr.com/4276/34267350114_7913cee737_q.jpg","context":"https://www.flickr.com/photos/86098980@N06/34267350114"}]`

## Built with

**Backend**
* [Node.js](https://nodejs.org/en/)
* [Express.js](http://expressjs.com/)
* [Flickr API](https://www.flickr.com/services/api/)

**Database**
* [MongoDB](https://www.mongodb.com/)

**Frontend**
* [Bootstrap](https://getbootstrap.com/)

--- 

This is a project from the [FreeCodeCamp](https://www.freecodecamp.org/) backend curriculum.