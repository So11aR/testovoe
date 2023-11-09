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

// card.addEventListener('click', function(event) {
//   const target = event.target
//   target.classList.toggle('active')
// })
// const loader = document.querySelector(".loader-wrapper");
// const btnLoadMore = document.querySelector(".show-more");
// btnLoadMore.onclick = fetchAndRenderData

// let page = 0

// Получение и вывод новостей
async function fetchAndRenderData() {
  // Show preloader
  // loader.classList.remove('none')

  // Fetch news data
  const data = await fetchData(url, options)
  // const totalPages = data.length
  // console.log(totalPages);

  // if (totalPages > 1) page++
  // console.log(page);
  
  // Проверка на большое кол-во новостей и отображение кнопки
  // if (totalPages > 1) btnLoadMore.classList.remove('none')

  // Hide preloader
  // loader.classList.add('none')

  // Render news
  renderNews(data);

  // if (page > totalPages) btnLoadMore.classList.add('none') 
}

// Разбивка на страницы
function spliceIntoChunks(arr, chunkSize) {
  const res = [];
  while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
  }
  console.log('res',res);
  return res;
}

async function fetchData(url, options) {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);

  // const newData = spliceIntoChunks(data, 6)
  // console.log(newData);

  // return newData
  return data
}

function renderNews(news) {
  for (news of news) {

    const card = document.createElement('div')
    card.classList.add('card')
    card.id = news.id

    card.onclick = addLike
    // <img src=${news.imgUrl} alt="">
    const html = `
        <div class="card__header">
          <img src=${news.imgUrl} alt="img  ">
          
        </div>
        <div class="card__body-wrapper">
          <div class="card__body">
            <div>
              <h1 class="card__title">${news.name}</h1>
              <p class="card__date">${news.date}</p>
            </div>
            <div>
              <p class="card__description">${news.text}
              </p>
            </div>
            <div>
              <h4 class="card__author">${news.author}</h4>
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
    console.log('Uspex');
    clickTarget.classList.toggle('active')
  }
}
fetchAndRenderData().catch((err) => console.log(err));
