let appHead = document.querySelector('.header');

///////////////// добавляем массив шапок 
const arrayOfHeaders = ['newstrawberry', 'raspberry', 'peach'];
let headers = [];
arrayOfHeaders.forEach( (item) => {
    let elem = document.createElement('div');
    let elemChild = document.createElement('div');
    elem.className = `header__item ${item}`;
    elemChild.className =`header__item__label ${item}`;
    elem.insertAdjacentElement("beforeend", elemChild)
    elem.style.animation= 'none';
    elem.style.top = '0';
    headers.push(elem);
})

//////////////////заменяем шапки в разметке сразу после анимации
setTimeout( ()=> {
    headers[0].classList.add('active');
    appHead.replaceWith(...headers);
}, 1550);




///////////////// переходы фруктов при слайде
let fruits = [];
fruits.push(document.querySelectorAll('.body__item--strawberry'));
fruits.push(document.querySelectorAll('.body__item--raspberry'));
fruits.push(document.querySelectorAll('.body__item--peach'));
console.log(fruits);

// начальное появление первых фруктов
fruits[0].forEach( item => {
    item.classList.contains('body__item--strawberry') ? item.classList.add('in') : false
})



//////////////////////////// реализация слайдера
const arrowLeft = document.getElementById('left');
const arrowRight = document.getElementById('right');
let counter =  0;



const carusel = document.querySelector('.body__item__teas__carusel');
const container = document.querySelector('.body__item__teas');
const caruselItems = document.querySelectorAll('.body__item__tea');
const ItemWidth =  container.clientWidth;
let position = 0;


arrowLeft.addEventListener('click', () => {
    counter--;
    if(counter < 0) counter = headers.length - 1; 
    slideHeader(counter);

    position += ItemWidth;
    if(position > 0) position = ( (caruselItems.length -1) * ItemWidth) * -1;
    slideTea(position);
    fruitsTransitions(counter);
    
});
arrowRight.addEventListener('click', () => {
    counter++;
    if (counter >= headers.length) counter = 0;
    slideHeader(counter);

    position -= ItemWidth;
    if(position <= (caruselItems.length * ItemWidth) * -1) position = 0;
    slideTea(position);
    fruitsTransitions(counter);
});


/////////////// перенаправление по нажатию кнопки

const button = document.querySelector('.body__item__button');
button.addEventListener('click', () => window.location.href ='http://google.com');

/////////////////////////// функции

// cлайд хедера
function slideHeader(counter) { 

    headers.forEach( item => item.classList.remove('active'))
    headers[counter].classList.add('active');
}

// слайд чайков
function slideTea(pos) {
    carusel.style.transform = `translateX(${pos}px)`;
}

// слайд фруктов
function fruitsTransitions(counter) {
    fruits.forEach( (item) => {
        item.forEach( element =>  element.classList.contains('in') ? element.classList.remove('in') && element.classList.add('out')  : false )
    });
    fruits[counter].forEach( item => item.classList.add('in'))
}
