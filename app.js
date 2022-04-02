



const apiKey = 'a6f667e97ec24c998bfad8909e22a616'
const baseURL = 'https://news-api-v2.herokuapp.com'

const http = new XMLHttpRequest()


const API = {

getInfo(countries, categories, callback){  

http.open('GET', `${baseURL}/top-headlines?country=${countries}&category=${categories}&pageSize=50&apiKey=${apiKey}`)


http.addEventListener('load', () => {if(http.status == 200){
    callback(JSON.parse(http.responseText))}
else {console.log(`Server error: ${http.status}`)}})

http.addEventListener('error', () => console.log(error))

http.send()

},

searchByWord(keyword, callback){

    http.open('GET', `${baseURL}/top-headlines?q=${keyword}&apiKey=${apiKey}`)

    http.addEventListener('load', () => {if(http.status == 200){
      callback(JSON.parse(http.responseText))}
  else {console.log(`Server error: ${http.status}`)}})
  
  http.addEventListener('error', () => console.log(error))
  
  http.send()

},

searchArticles(keyword, callback){

  http.open('GET', `${baseURL}/everything?q=${keyword}&apiKey=${apiKey}`)

  http.addEventListener('load', () => {if(http.status == 200){
    console.log(http.status)
    callback(JSON.parse(http.responseText))}
else {console.log(`Server error: ${http.status}`)}})

http.addEventListener('error', () => console.log(error))

http.send()

}

}


const userCategories = document.forms['search_news']
const userKeyword = document.forms['keyword_search']
const userArticle = document.forms['article_search']

userCategories.addEventListener('submit', getNews)
userKeyword.addEventListener('submit', searchNews)
userArticle.addEventListener('submit', searchArticles)



function getNews(e){

e.preventDefault()

const countries = userCategories.elements['countries'].value
const categories = userCategories.elements['categories'].value

API.getInfo(countries, categories, callback)

}

function searchNews(e) {

  e.preventDefault()

  const keyword = userKeyword.elements['keyword'].value.trim()
  API.searchByWord(keyword, callback)
}

function searchArticles(e) {

  e.preventDefault()

  const keyword = userArticle.elements['article'].value.trim()
  API.searchArticles(keyword, callback)
}


function callback(obj){

  let content = document.querySelector('.content')
  content.innerHTML = '' 

  const quantity = obj.totalResults
  const articles = obj.articles

  let fragment = ''
  articles.forEach(el=> {fragment += cardCreator(el)})
  content.insertAdjacentHTML('afterbegin', fragment)
}


function cardCreator (article) {
    return `<div class="col s12">
    <div class="card" style="width: 18rem;">
      <img src=${article.urlToImage || "./pics/no-image-icon.png"} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${article.title || '...'}</h5>
        <p class="card-text">${article.description || '...'}</p>
        <a href=${article.url} target="_blank" class="btn btn-primary">Read more</a>
      </div>
    </div>
    </div>`
    }




// Request parameters

// GET https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=a6f667e97ec24c998bfad8909e22a616

// apiKey
// REQUIRED
// Your API key. Alternatively you can provide this via the X-Api-Key HTTP header.

// country
// The 2-letter ISO 3166-1 code of the country you want to get headlines for. Possible options: aearataubebgbrcachcncocuczdeegfrgbgrhkhuidieilinitjpkrltlvmamxmyngnlnonzphplptrorsrusasesgsiskthtrtwuausveza. Note: you can't mix this param with the sources param.

// category
// The category you want to get headlines for. Possible options: businessentertainmentgeneralhealthsciencesportstechnology. Note: you can't mix this param with the sources param.

// sources
// A comma-seperated string of identifiers for the news sources or blogs you want headlines from. Use the /top-headlines/sources endpoint to locate these programmatically or look at the sources index. Note: you can't mix this param with the country or category params.

// q
// Keywords or a phrase to search for.

// pageSize
// int
// The number of results to return per page (request). 20 is the default, 100 is the maximum.

// page
// int




// {status: 'ok', totalResults: 37, articles: Array(20)}

// author: "https://www.facebook.com/bbcnews"
// content: "By Christy CooneyBBC News\r\nMedia caption, Nick Miller gives the latest UK weather forecast\r\nAround 200,000 homes have been left without power and the transport network continues to be severely affect… [+6331 chars]"
// description: "Thousands are left without power, travel networks are disrupted and hundreds of schools are closed."
// publishedAt: "2022-02-18T17:39:55Z"
// source: {id: 'bbc-news', name: 'BBC News'}
// title: "Storm Eunice: Record wind gust amid disruption - BBC News"
// url: "https://www.bbc.co.uk/news/uk-60426382"
// urlToImage: "https://ichef.bbci.co.uk/news/1024/branded_news/3188/production/_123308621_gettyimages-1238586060.jpg"







