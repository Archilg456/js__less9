"use strict"

let main_box = document.getElementById('post__info');
let overlay = document.getElementById('overlay');
let popapcontent = document.getElementById('overlay__content');
let closeBtn = document.getElementById('close_btn');


function ajax(url, callback ) {
let request = new XMLHttpRequest();
request.open('GET', url)
request.addEventListener('load', function(){
    let recivedInfo = JSON.parse(this.responseText);
    callback(recivedInfo);
});
request.send();
}
function createPost(element) {
    let div__box = document.createElement('div');
    div__box.classList.add('post__info__box');
    div__box.setAttribute('date-id', element.id);
    let post__id = document.createElement('h4');
    post__id.innerText = element.id;
    let post__title = document.createElement('h2');
    post__title.innerText = element.title;
    div__box.appendChild(post__id);
    div__box.appendChild(post__title);
    div__box.addEventListener('click', function(event){
        let id = event.target.getAttribute('date-id');
        overlay.classList.add('active');
        let servUrl = `https://jsonplaceholder.typicode.com/posts/${id}`;
        ajax(servUrl, function(recivedInfo){
            overlaydescription(recivedInfo); 
        });
        console.log(id);
    })
    main_box.appendChild(div__box);
    console.log(div__box);
}
function overlaydescription(element){
    let description = document.createElement('p');
    description.innerText = element.body;
    popapcontent.appendChild(description);
}
closeBtn.addEventListener('click', function(){
    overlay.classList.remove('active');
    popapcontent.innerHTML = " ";  
})
ajax('https://jsonplaceholder.typicode.com/posts', function(recivedInfo){
    recivedInfo.forEach(element => {  
        createPost(element);
    });
});