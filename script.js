"use strict"

const isMobile = {
    Andorid: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    ios: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Andorid() ||
            isMobile.BlackBerry() ||
            isMobile.ios() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};



//меню arrow

if(isMobile.any()){
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow') //собираем в переменную все стрелочки (их может быть много)
    if(menuArrows.length > 0) {  //проверяем есть ли такие ребята в "массиве"
        for (let index = 0; index < menuArrows.length; index++) {
            const menuArrow = menuArrows[index]; //создаем цикл, чтобы по ним пробежаться (ну в данном случае у нас всего 1 стрелка)
            menuArrow.addEventListener('click', function e() {
                menuArrow.parentElement.classList.toggle('_active'); //при клике даем родителю класс актив, при повторном убираем (toggle)
            })
        }
    }

} else {
    document.body.classList.add('_pc')
}


//меню бургер

const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body'); //получим в константу menu__body эта ересь тоже понадобится
if (iconMenu){ //на всякий случай делаем проверку, есть ли у нас вообще такая ересь, если есть продолжим
    iconMenu.addEventListener('click', function (e) { //создаем событие клик по иконке 
        iconMenu.classList.toggle('_active'); //обращаемся к самой иконке, при клике добавляем и убираем класс актив
        menuBody.classList.toggle('_active'); //обращаемся к самой menuBody, при клике добавляем и убираем класс актив
        document.body.classList.toggle('_lock');
    })
}





// Прокрутка при клике

const menuLinks = document.querySelectorAll('.menu__link[data-goto]'); //выбираем все меню линки у которых есть атрибут data-goto
if(menuLinks.length > 0) { //проверка есть ли такие ребята, если есть начинаем работу
    menuLinks.forEach(menuLink => {  //пробежимся по ним, на этот раз forEach для разнообразия
        menuLink.addEventListener('click', onMenuLinkClick) 
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;  //так получаем объект на который мы кликаем, фактически это будет сама ссылка
         //(внизу)далее проверяем заполнен ли данный атрибут, есть ли там что-то, кроме этого проверяем существует ли объект на который ссылается данный дата атрибут (т.е. есть ли класс в document с таким значением указанным в data-goto)
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){ //если есть такая тема, закинем ее в константу
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
            //^(вверху) мы высчитывеам положение этого объекта обязательно с учетом высоты шапки. Создаем константу и с помощью ф-и getBoundingClientRect().top - мы получаем местоположение на странице. (.top - потомучто мы хотим получить расстояние от верха)
            //обязательно мы прибавляем количество прокручиваний pageYOffset и отнимаем высоту шапки (как я понял чтобы она не перекрыла просматриваемый объект, у нас же position: fixed). Соответственно в этой константе у нас точное положение секции с учетом проскроленного расстояния и высоты header


            /* ---  */ // сделаем чтобы при открытом меню на нажатие по сслыке закрывалось меню и после был переход по ссылке. А то без этого меню остается открытым, а переход осущетсвляется

            if(iconMenu.classList.contains('_active')){ //если содержит класс актив - фактически означает открыто ли меню, значит мы должны убратб классы, которые открывают меню
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
            }

            /* ---  */


            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            // далее напишем кусок кода, который и заставит скролл прокрутиться к нужному месту. Обращаемся к объекту window, пишем scrollTo - ф-я которая занимается прокруткой, указываем top, т.е. нам нужно прокрутиться сверху и указываем gotoBlockValue (высчитанное кол-во положения секции), со вторым параметром все понятно
            e.preventDefault(); //для того, чтоюы прекратить работу ссылки, чтобы она не переходила в href, а просто выполняла прокрутку.

        }
    }

}