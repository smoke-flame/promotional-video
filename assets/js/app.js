const app = document.querySelector('.app');
const wrapper = document.querySelector('.wrapper');

// до загрузки стилей и картинок ставим картинку-заглушку загрузки 
app.style.visibility='hidden';
wrapper.classList.add('before-loaded');

window.addEventListener('load', event => {
    // заглушка при загрузке в ленскейпе
    if(event.currentTarget.orientation == 90) toogleClasses();

    // после загрузки стилей/картинок убираем картинку-заглушку
    app.style.visibility='visible';
    wrapper.classList.remove('before-loaded');

    let appHead = document.querySelector('.header');

    ///////// заглушка при повороте
    window.addEventListener("orientationchange", () => toogleClasses());

    ///////////////// добавляем массив шапок 
    const arrayOfHeaders = ['newstrawberry', 'raspberry', 'peach'];
    let headers = [];
    // парсим для каждой шапки разметку
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

    // начальное появление первых фруктов
    fruits[0].forEach( item => {
       item.classList.add('in') ;
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

    arrowLeft.addEventListener('click', () => leftSwipeApp() );
    arrowRight.addEventListener('click',() => rightSwipeApp() );

    ///////////////// свайп карусели

    let x1 = null, 
        x2 = null,
        swipe = null,
        isSwipe = false
        needToSwipe = ItemWidth / 3;

    container.addEventListener('touchstart', event => {
        x1 = event.changedTouches[0].clientX;
    })

    container.addEventListener('touchmove', event => {

        x2 = event.changedTouches[0].clientX;
        swipe = x2 - x1;
        slideTea(position + swipe);
        if(swipe > needToSwipe || swipe * -1 > needToSwipe) {
            isSwipe = true;
        } else {
            isSwipe = false;
        }
    });

    container.addEventListener('touchend', () => {
        if(!isSwipe) {
            slideTea(position);

        } else if(swipe > needToSwipe && isSwipe) {
            isSwipe = !isSwipe;
            leftSwipeApp();
        
        } else if( Math.abs(swipe) > needToSwipe && isSwipe) {
            isSwipe = !isSwipe;
            rightSwipeApp();
        }   
    })

    /////////////// перенаправление по нажатию кнопки
    const button = document.querySelector('.body__item__button');
    button.addEventListener('click', () => window.location.href ='http://google.com');

    /////////////////////////// функции

    // весь свайп / слайд 
    function rightSwipeApp() {
        counter++;
        if (counter >= headers.length) counter = 0;
        position -= ItemWidth;
        if(position <= (caruselItems.length * ItemWidth) * -1) position = 0;
        slideHeader(counter);
        slideTea(position);
        fruitsTransitions(counter);
    }

    function leftSwipeApp() {
        counter--;
        if(counter < 0) counter = headers.length - 1; 
        position += ItemWidth;
        if(position > 0) position = ( (caruselItems.length -1) * ItemWidth) * -1;
        slideHeader(counter);
        slideTea(position);
        fruitsTransitions(counter);
    }
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
    // переключение классов(для заглушки при landscape)
    function toogleClasses() {
        app.classList.toggle('none');
        wrapper.classList.toggle('landscape');
    };
})
