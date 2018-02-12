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

**Passing this:**

`http://www.example.com/api/latest/imagesearch`

**Returns this:**
`[{"term":"horse","when":"2018-02-12T21:13:03.318Z"},{"term":"camel","when":"2018-02-12T20:04:32.000Z"},{"term":"camel","when":"2018-02-12T20:04:03.721Z"},{"term":"cow","when":"2018-02-12T20:03:57.946Z"},{"term":"cow","when":"2018-02-12T20:03:52.651Z"},{"term":"cow","when":"2018-02-12T20:03:48.408Z"},{"term":"cow","when":"2018-02-12T20:03:39.787Z"},{"term":"cow","when":"2018-02-12T20:03:39.747Z"},{"term":"cow","when":"2018-02-12T19:19:59.217Z"},{"term":"cow","when":"2018-02-12T19:19:16.254Z"}]`

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