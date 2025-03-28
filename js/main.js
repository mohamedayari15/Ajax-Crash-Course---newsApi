const apiKey = '8057620af1484a729fe203d44cc95266';
let category = 'general';  // Default category

const Links = document.getElementsByClassName("nav-link");

for (let i = 0; i < Links.length; i++) { 
    Links[i].addEventListener('click', function (e) {
        category = e.target.innerHTML.toLowerCase();
        for (link of Links) {
            link.classList.remove('active');
        }
        e.target.classList.add('active');
        getData();
    });
}

let data = [];

function getData() {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    var myRequest = new XMLHttpRequest();
    myRequest.open('GET', apiUrl, true);
    
    myRequest.onreadystatechange = function () {
        if (myRequest.readyState === 4 && myRequest.status === 200) {
            data = JSON.parse(this.responseText).articles; 
            showData(); 
        }
    };
    myRequest.send();
}

function showData() {
    let row = '';
    for (let i = 0; i < data.length; i++) {
        row += `
            <div class="col-md-4" test>
                <img src="${data[i].urlToImage}" alt="" class="img-fluid">
                <h1>${data[i].title}</h1>
                <p>${data[i].description}</p>
            </div>
        `;
    }
    document.getElementById('row').innerHTML = row; 
}

getData();
