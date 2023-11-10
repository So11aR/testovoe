// Настройки
const url = 'https://dev.mykgproxy.webprofy.ru/upload/frontend/data.json'
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

// DOM элементы
const rowWrapper = document.querySelector(".row");
const card = document.querySelector('.card')
const loader = document.querySelector(".loader-wrapper");
const btnLoadMore = document.querySelector(".show-more");
btnLoadMore.onclick = fetchAndRenderData

let page = -1

// Получение и вывод новостей
async function fetchAndRenderData() {
  // Show preloader
  loader.classList.remove('none')

  // Fetch news data
  const data = await fetchData(url, options)
  const totalPages = data.length

  // Проверка на большое кол-во новостей и отображение кнопки
  if (totalPages > 1) btnLoadMore.classList.remove('none')

  if (totalPages > 1) page++
  
  // Render news
  renderNews(data, page);

  // Hide preloader
  loader.classList.add('none')

  if (page === totalPages - 1) {
    btnLoadMore.classList.add('none')
    loader.classList.add('none')
    return
  } 
}

// Разбивка на страницы
function spliceIntoChunks(arr, chunkSize) {
  const res = [];
  while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
  }
  return res;
}

async function fetchData(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  const newData = spliceIntoChunks(data, 6)
  return newData
}

function renderNews(news, page) {
  for (const newItem of news[page]) {
    const card = document.createElement('div')
    card.classList.add('card')
    card.id = newItem.id

    card.onclick = addLike
    const html = `
        <div class="card__header">
          <img src=${newItem.imgUrl} alt="">
        </div>
        <div class="card__body-wrapper">
          <div class="card__body">
            <div>
              <h1 class="card__title" title="${newItem.name}">${newItem.name}</h1>
              <p class="card__date">${newItem.date}</p>
            </div>
            <div>
              <p class="card__description">${newItem.text}
              </p>
            </div>
            <div>
              <h4 class="card__author">${newItem.author}</h4>
            </div>
            <div class="icon-btn"></div>
          </div>
        </div>
      `;
      card.insertAdjacentHTML('afterbegin', html)
      rowWrapper.insertAdjacentElement('beforeend', card)
  }
}

function addLike (event) {
  const clickTarget = event.target
  if (clickTarget.classList.contains('icon-btn')) {
    clickTarget.classList.toggle('active')
  }
}
fetchAndRenderData().catch((err) => console.log(err));