const loadNewsApi = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data.news_category))
        .catch(error => {
            document.getElementById('navbar').style.display = 'none';
            document.getElementById('news-cetagori').style.display = 'none';
            document.getElementById('spinner').style.display = 'none';
            const error2 = document.getElementById('errom-message');
            error2.classList.remove('d-none')
        })
}
const displayNews = (cetagories) => {
    document.getElementById('spinner').style.display = 'none';
    const menuContainer = document.getElementById('list-container');
    cetagories.forEach(cetagory => {
        const li = document.createElement('li');
        li.innerHTML = `
        <a class="cetagory-item list-group-item list-group-item-action active" onclick="loadNewsId('${cetagory.category_id}')" href="#">${cetagory.category_name}</a>
        `;
        menuContainer.appendChild(li);
    });
}
const loadNewsId = (id) => {
    document.getElementById('spinner').style.display = 'block';
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsId(data))
        .catch(error => {
            document.getElementById('navbar').style.display = 'none';
            document.getElementById('news-cetagori').style.display = 'none';
            document.getElementById('spinner').style.display = 'none';
            const error2 = document.getElementById('errom-message');
            error2.classList.remove('d-none')
        })

}

const displayNewsId = (news) => {
    document.getElementById('spinner').style.display = 'none';
    const allNews = news.data;
    allNews.sort((a, b) => {
        return b.total_view - a.total_view
    })

    // console.log(allNews);

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    const notFound = document.getElementById('not-found');

    // if no news available see a no item message

    if (allNews.length === 0) {
        notFound.classList.remove('d-none');
        const showTotalNews = document.getElementById('total-news-show');
        showTotalNews.innerText = '0 News Available in this cetagory';

        // console.log('no data available')

    } else {
        notFound.classList.add('d-none');
    }

    // how many new see message this 
    const showTotalNews = document.getElementById('total-news-show');
    // 
    if (allNews.length >= 1) {
        showTotalNews.innerText = `
          ${allNews.length} News Find Of this categories
      `;

    }

    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row', 'mb-5', 'shadow-lg');
        newsDiv.innerHTML = `
        <div data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadDetails('${news._id}')" class="col-md-4 p-0">
        <img src="${news.image_url}" class="img-fluid w-full" alt="...">
      </div>
      <div data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadDetails('${news._id}')" class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${news.title}</h5>
          <p class="card-text">${news.details.slice(0, 300) + '..........'}</p>
        </div>
        <div class="d-flex gap-4 justify-content-between align-items-center">
        <div class="d-flex gap-4">
              <div>
              <img class="img-size rounded-circle" src="${news.author.img}" alt="">
              </div>
              <div>
              <p class="m-0">${news.author.name ? news.author.name : 'N/a'}</p>
              <p>${news.author.published_date ? news.author.published_date : "not found published date" }</p>
              </div>
        </div>
        <div>
        <p><i class="fa-solid fa-eye text-primary"></i> ${news.total_view ? news.total_view : '0'}M</p>
        </div>
        <div>
            <div>
              <p><i class="fa-solid fa-star text-primary"></i>  ${news.rating.number} </p>
            </div>
           
        </div>
        <div>
        <i class="fa-sharp fa-solid fa-arrow-right text-primary fs-2"></i>
        </div>

    </div>
      </div>

    
        `;
        newsContainer.appendChild(newsDiv);
        // console.log(allNews.length)
    });
}
const loadDetails = (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayModal(data.data[0]))
        .catch(error => {
            document.getElementById('navbar').style.display = 'none';
            document.getElementById('news-cetagori').style.display = 'none';
            document.getElementById('spinner').style.display = 'none';
            const error2 = document.getElementById('errom-message');
            error2.classList.remove('d-none')
        })

}
const displayModal = (datas) => {
    const ModalShow = document.getElementById('news-modal-show');
    ModalShow.innerHTML = `
   
   <div class="modal-content">
   <div class="modal-header">

     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
   </div>
   <div class="modal-body">
   <img class="w-full img-fluid" src="${datas.image_url}" alt=""> 
   <h5>${datas.title}</h5>
   <p>${datas.details.slice(0, 120) + "....."}</p>
   <div class="d-flex">
         <div class="author">
            <div class="d-flex align-items-center gap-5">
            <div>
            <img class="img-size rounded-circle" src="${datas.author.img}" alt="">
            </div>
            <div>
            <p class="m-0">${datas.author.name ? datas.author.name : 'N/a'}</p>
            <p>${datas.author.published_date ? datas.author.published_date : "not found published date" }</p>
            </div>
            <div class="rating">
            <p><i class="fa-solid fa-star text-primary"></i>  ${datas.rating.number} </p>
            </div>
            <div>
        <p><i class="fa-solid fa-eye text-primary"></i> ${datas.total_view ? datas.total_view : '0'}M</p>
        </div>
      </div>
      
     </div>
   </div>
   </div>
   <div class="modal-footer">
     <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
     <button type="button" class="btn btn-primary">Save changes</button>
   </div>
 </div>
   `;

}
loadNewsId('08')
loadNewsApi()