"use strict";


/* ---------- ********** ОБЩИЕ ********** ---------- */


{
    //ПРОЯВЛЕНИЕ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ


    const hidds = Array.from (document.querySelectorAll (`.hidds`));

    hidds.forEach ((v, i, a) => {
        a[i].style.opacity = `0`;
    });

    window.addEventListener (`scroll`, () => {
        hidds.forEach ((v, i, a) => {
            let rect = a[i].getBoundingClientRect ();
            if (rect.top < window.innerHeight * 0.9) {
                a[i].style.opacity = `1`;
            }
        });
    });
}







/* ---------- ********** WEB-HEADER ********** ---------- */


{
    //ВЫПАДАЮЩЕЕ МЕНЮ ДЛЯ МОБИЛЬНЫХ УСТРОЙСТВ
    

    const mobMenu = document.querySelector (`.header--nav__MOB_MENU`);
    const mobMenuItems = Array.from (document.querySelectorAll (`.header--a__MOB_MENU`));
    const burgers = Array.from (document.querySelectorAll (`.header--img__BURGER`));
    const white = document.querySelector (`#white`);
    

    //смена темы с темной на светлую у выпадающего 
    //меню при аналогичной замене у шапки

    window.addEventListener (`scroll`, () => {
        if (white.getBoundingClientRect().top <= 0) {
            mobMenu.classList.add (`ADD__header--nav__MOB_MENU_WHITE`);
            mobMenuItems.forEach ((v, i, a) => {
                a[i].classList.add (`ADD__header--a__MOB_MENU__WHITE`);
            });
        } else {
            mobMenu.classList.remove (`ADD__header--nav__MOB_MENU_WHITE`);
            mobMenuItems.forEach ((v, i, a) => {
                 a[i].classList.remove (`ADD__header--a__MOB_MENU__WHITE`);
            });
        }
    });


    //назначение прослушивателя на бургеры в светлом и темном вариантах

    burgers.forEach ((v, i, a) => {
        a[i].addEventListener (`click`, () => {
            mobMenu.classList.toggle (`ADD__header--nav__MOB_MENU__VISIBLE`);
        });
    });


    //закрытие меню по клику на документ

    document.addEventListener (`click`, (event) => {
        if (event.target !== mobMenu &&
        event.target !== burgers[0] &&
        event.target !== burgers[1] &&
        mobMenu.classList.contains (`ADD__header--nav__MOB_MENU__VISIBLE`)) 
        {
            mobMenu.classList.remove (`ADD__header--nav__MOB_MENU__VISIBLE`);
        }
    });
}







/* ---------- ********** СЕКЦИЯ HERO ********** ---------- */


{
    //БЕГУЩИЕ СТРОКИ


    //две функции для реализации бегущих строк и их вызов

    function animTapeLeft (cont, block, group) {
        const container = document.querySelector (cont);
        const scr = parseFloat (window.getComputedStyle (container).width);
        const block1 = document.querySelector (block);
        const group1 = document.querySelector (group);
        let gap = parseFloat (window.getComputedStyle (block1).gap);

        const rect = group1.getBoundingClientRect().width + gap;

        let ratio = +(rect / (scr * 2) * 100).toFixed(2);

        block1.animate ([
            {transform: `translateX(-${ratio}%)`},
            {transform: `translateX(0%)`},
        ],
        {
            duration: 22000,
            iterations: Infinity
        });
    }


    function animTapeRight (cont, block, group) {
        const container = document.querySelector (cont);
        const scr = parseFloat (window.getComputedStyle (container).width);
        const block1 = document.querySelector (block);
        const group1 = document.querySelector (group);
        let gap = parseFloat (window.getComputedStyle (block1).gap);
    
        const rect = group1.getBoundingClientRect().width + gap;

        let ratio = +(rect / (scr * 2) * 100).toFixed(2);

        block1.animate ([
            {transform: `translateX(0%)`},
            {transform: `translateX(-${ratio}%)`},
        ],
        {
            duration: 22000,
            iterations: Infinity
        });
    }


    animTapeLeft (`.hero--div__CONTAINER1`, 
    `.hero--div__CONTAINER1 .hero--div__BLOCK`, 
    `.hero--div__CONTAINER1 .hero--div__GROUP:first-child`,
    );

    animTapeRight (`.hero--div__CONTAINER2`, 
    `.hero--div__CONTAINER2 .hero--div__BLOCK`, 
    `.hero--div__CONTAINER2 .hero--div__GROUP:first-child`,
    );


    //вызов данных функций при каждом изменении размера окна

    window.addEventListener('resize', () => {
        animTapeLeft (`.hero--div__CONTAINER1`, 
        `.hero--div__CONTAINER1 .hero--div__BLOCK`, 
        `.hero--div__CONTAINER1 .hero--div__GROUP:first-child`,
        );

        animTapeRight (`.hero--div__CONTAINER2`, 
            `.hero--div__CONTAINER2 .hero--div__BLOCK`, 
            `.hero--div__CONTAINER2 .hero--div__GROUP:first-child`,
        );
    });
}







/* ---------- ********** СЕКЦИЯ WHITE ********** ---------- */


{
    //СЛАЙДЕР ПО СКРОЛЛУ №1

    const main = document.querySelector (`.horizontal-container._800vh`);


    //текстовый контент

    const n1 = document.querySelector (`.fs-main-content._1.wht`);
    const n2 = document.querySelector (`.fs-main-content._2.wht`);
    const n3 = document.querySelector (`.fs-main-content._3.wht`);


    //ссылки

    const whiteA1 = Array.from (document.querySelectorAll (`.white--a__1`));
    const whiteA2 = Array.from (document.querySelectorAll (`.white--a__2`));
    const whiteA3 = Array.from (document.querySelectorAll (`.white--a__3`));


    //картинки

    const i1 = document.querySelector (`.fs-image.pc._1.wht`);
    const i2 = document.querySelector (`.fs-image.pc._2.wht`);
    const i3 = document.querySelector (`.fs-image.pc._3.wht`);

    const imob1 = document.querySelector (`.fs-image.mobile._1.wht`);
    const imob2 = document.querySelector (`.fs-image.mobile._2.wht`);
    const imob3 = document.querySelector (`.fs-image.mobile._3.wht`);


    //прослушивание скролла

    window.addEventListener (`scroll`, () => {
        let mainRect = main.getBoundingClientRect();
        let third = mainRect.height / 3;

        if (mainRect.top > 0) {
            n1.style.opacity = 1;
            i1.style.transform = `translate(0%, 0%)`;
            imob1.style.transform = `translate(0%, 0%)`;
        }

        if (mainRect.top <= 0 && mainRect.bottom > 0) {
            //1
            if (-mainRect.top >=0 && -mainRect.top <= third * 0.2) {
                n1.style.opacity = 1;
                i1.style.transform = `translate(0%, 0%)`;
                imob1.style.transform = `translate(0%, 0%)`;
            }
            if ((-mainRect.top > third * 0.2) && -mainRect.top < third) {
                let k = (-mainRect.top - third * 0.2) / (third * 0.8);
                n1.style.opacity = 1 - k;
                i1.style.transform = `translate(${k * 120}%, 0%)`;
                imob1.style.transform = `translate(${k * 120}%, 0%)`;
            }

            //2
            if (-mainRect.top >= third && -mainRect.top < third * 1.2) {
                n1.style.opacity = 0;
                n2.style.opacity = 1;
                i1.style.transform = `translate(120%, 0%)`;
                imob1.style.transform = `translate(120%, 0%)`;
                i2.style.transform = `translate(0%, 0%)`;
                imob2.style.transform = `translate(0%, 0%)`;
            }
            if (-mainRect.top > third * 1.2 && -mainRect.top < third * 2) {
                let k1 = (-mainRect.top - third * 1.2) / (third * 0.8);
                n1.style.opacity = 0;
                n2.style.opacity = 1 - k1;
                i1.style.transform = `translate(120%, 0%)`;
                imob1.style.transform = `translate(120%, 0%)`;
                i2.style.transform = `translate(${k1 * 120}%, 0%)`;
                imob2.style.transform = `translate(${k1 * 120}%, 0%)`;
            }

            //3
            if (-mainRect.top >= third * 2 && -mainRect.top < third * 2.2) {
                n1.style.opacity = 0;
                n2.style.opacity = 0;
                n3.style.opacity = 1;
                i1.style.transform = `translate(120%, 0%)`;
                imob1.style.transform = `translate(120%, 0%)`;
                i2.style.transform = `translate(120%, 0%)`;
                imob2.style.transform = `translate(120%, 0%)`;
            }
            if (-mainRect.top > third * 2.2 && -mainRect.top < third * 3) {
                n1.style.opacity = 0;
                n2.style.opacity = 0;
                n3.style.opacity = 1;
                i1.style.transform = `translate(120%, 0%)`;
                imob1.style.transform = `translate(120%, 0%)`;
                i2.style.transform = `translate(120%, 0%)`;
                imob2.style.transform = `translate(120%, 0%)`;
            }
        }
    });



    //прослушиание скролла для ссылок

    window.addEventListener (`scroll`, () => {
        let mainRect = main.getBoundingClientRect();
        let third = mainRect.height / 3;

        if (mainRect.top > 0) {
            whiteA1.forEach ((v, i, a) => {
                a[i].classList.add (`__add--white--a__BLACK`);
            });
            whiteA2.forEach ((v, i, a) => {
                a[i].classList.remove (`__add--white--a__BLACK`);
            });
            whiteA3.forEach ((v, i, a) => {
                a[i].classList.remove (`__add--white--a__BLACK`);
            });
        }

        if (mainRect.top <= 0 && mainRect.bottom > 0) {
            //1
            if (-mainRect.top >=0 && -mainRect.top <= third * 0.5) {
                whiteA1.forEach ((v, i, a) => {
                    a[i].classList.add (`__add--white--a__BLACK`);
                });
                whiteA2.forEach ((v, i, a) => {
                    a[i].classList.remove (`__add--white--a__BLACK`);
                });
                whiteA3.forEach ((v, i, a) => {
                    a[i].classList.remove (`__add--white--a__BLACK`);
                });
            }

            //2
            if ((-mainRect.top > third * 0.5) && -mainRect.top < third * 1.5) {
                whiteA1.forEach ((v, i, a) => {
                    a[i].classList.remove (`__add--white--a__BLACK`);
                });
                whiteA2.forEach ((v, i, a) => {
                    a[i].classList.add (`__add--white--a__BLACK`);
                });
                whiteA3.forEach ((v, i, a) => {
                    a[i].classList.remove (`__add--white--a__BLACK`);
                });
            }

            //3
            if (-mainRect.top >= third * 1.5 && -mainRect.top < third * 2.5) {
                whiteA1.forEach ((v, i, a) => {
                    a[i].classList.remove (`__add--white--a__BLACK`);
                });
                whiteA2.forEach ((v, i, a) => {
                    a[i].classList.remove (`__add--white--a__BLACK`);
                });
                whiteA3.forEach ((v, i, a) => {
                    a[i].classList.add (`__add--white--a__BLACK`);
                });
            }
        }
    });



    //прослушивание кликов по ссылкам

    whiteA1.forEach ((v, i, a) => {
        a[i].addEventListener (`click`, (e) => {
            e.preventDefault ();
            let mainRect = main.getBoundingClientRect();
            let third = mainRect.height / 3;
            let y = mainRect.top + window.scrollY + 10;

            window.scrollTo (0, y);
        });
    });
    
    whiteA2.forEach ((v, i, a) => {
        a[i].addEventListener (`click`, (e) => {
            e.preventDefault ();
            let mainRect = main.getBoundingClientRect();
            let third = mainRect.height / 3;
            let y = mainRect.top + window.scrollY + 10 + third;

            window.scrollTo (0, y);
        });
    });

    whiteA3.forEach ((v, i, a) => {
        a[i].addEventListener (`click`, (e) => {
            e.preventDefault ();
            let mainRect = main.getBoundingClientRect();
            let third = mainRect.height / 3;
            let y = mainRect.top + window.scrollY + 10 + third * 2;

            window.scrollTo (0, y);
        });
    });



    
    //ПОЯВЛЕНИЕ ПОПАПА "ВВЕРХ"


    const white = document.querySelector (`#white`);
    const up = document.querySelector (`.button.up-btn.w-inline-block`);

    window.addEventListener (`scroll`, () => {
        let whiteRect = white.getBoundingClientRect ();

        if (whiteRect.top > 600) {
            up.style.transform = `translate(200px, 0px)`;
        }

        if (whiteRect.top <= 600 && whiteRect.top > -400) {
            let k = (whiteRect.top + 400) / 5;
            up.style.transform = `translate(${k}px, 0px)`;
        }

        if (whiteRect.top <= -400) {
            up.style.transform = `translate(0px, 0px)`;
        }
    });
}







/* ---------- ********** СЕКЦИЯ HIDDEN MOBILE ********** ---------- */


{
    //ГОРИЗОНТАЛЬНАЯ ПРОКРУТКА КОНТЕНТА ПРИ СКРОЛЛЕ


    const track = document.querySelector (`.track-frame.w-dyn-items`);

    function scr () {
        if (window.innerWidth < 992) return;

        let trackRect = track.getBoundingClientRect ();
        
        if (trackRect.top > 0) {
            track.style.transform = `translate(0%, 0px)`;
        }
        
        if (trackRect.top <= 0 && trackRect.top >= -trackRect.height) {
            let k = (-trackRect.top) / trackRect.height * 75;
            track.style.transform = `translate(${-k}%, 0px)`;
        }
        
        if (trackRect.top < -trackRect.height) {
            track.style.transform = `translate(0%, 0px)`;
        }
    }

    window.addEventListener (`scroll`, scr);
}







/* ---------- ********** СЕКЦИЯ HORIZONTAL SCROLL BLOCK ********** ---------- */


{
    //СЛАЙДЕР ПО СКРОЛЛУ №2


    const main = document.querySelector (`.horizontal-container._300vh`);


    //текстовый контент

    const n1 = document.querySelector (`.fs-main-content._1.hsb`);
    const n2 = document.querySelector (`.fs-main-content._2.hsb`);
    const n3 = document.querySelector (`.fs-main-content._3.hsb`);


    //ссылки

    const hsbA1 = Array.from (document.querySelectorAll (`.hsb--a__1`));
    const hsbA2 = Array.from (document.querySelectorAll (`.hsb--a__2`));
    const hsbA3 = Array.from (document.querySelectorAll (`.hsb--a__3`));


    //картинки

    const i1 = document.querySelector (`.fs-image.pc._1.hsb`);
    const i2 = document.querySelector (`.fs-image.pc._2.hsb`);
    const i3 = document.querySelector (`.fs-image.pc._3.hsb`);

    const imob1 = document.querySelector (`.fs-image.mobile._1.hsb`);
    const imob2 = document.querySelector (`.fs-image.mobile._2.hsb`);
    const imob3 = document.querySelector (`.fs-image.mobile._3.hsb`);


    //прослушивание скролла

    window.addEventListener (`scroll`, () => {
        let mainRect = main.getBoundingClientRect();
        let third = mainRect.height / 3;

        if (mainRect.top > 0) {
            n1.style.opacity = 1;
            i1.style.transform = `translate(0%, 0%)`;
            imob1.style.transform = `translate(0%, 0%)`;
        }

        if (mainRect.top <= 0 && mainRect.bottom > 0) {
            //1
            if (-mainRect.top >=0 && -mainRect.top <= third * 0.2) {
                n1.style.opacity = 1;
                i1.style.transform = `translate(0%, 0%)`;
                imob1.style.transform = `translate(0%, 0%)`;
            }
            if ((-mainRect.top > third * 0.2) && -mainRect.top < third) {
                let k = (-mainRect.top - third * 0.2) / (third * 0.8);
                n1.style.opacity = 1 - k;
                i1.style.transform = `translate(${k * 120}%, 0%)`;
                imob1.style.transform = `translate(${k * 120}%, 0%)`;
            }

            //2
            if (-mainRect.top >= third && -mainRect.top < third * 1.2) {
                n1.style.opacity = 0;
                n2.style.opacity = 1;
                i1.style.transform = `translate(120%, 0%)`;
                imob1.style.transform = `translate(120%, 0%)`;
                i2.style.transform = `translate(0%, 0%)`;
                imob2.style.transform = `translate(0%, 0%)`;
            }
            if (-mainRect.top > third * 1.2 && -mainRect.top < third * 2) {
                let k1 = (-mainRect.top - third * 1.2) / (third * 0.8);
                n1.style.opacity = 0;
                n2.style.opacity = 1 - k1;
                i1.style.transform = `translate(120%, 0%)`;
                imob1.style.transform = `translate(120%, 0%)`;
                i2.style.transform = `translate(${k1 * 120}%, 0%)`;
                imob2.style.transform = `translate(${k1 * 120}%, 0%)`;
            }

            //3
            if (-mainRect.top >= third * 2 && -mainRect.top < third * 2.2) {
                n1.style.opacity = 0;
                n2.style.opacity = 0;
                n3.style.opacity = 1;
                i1.style.transform = `translate(120%, 0%)`;
                imob1.style.transform = `translate(120%, 0%)`;
                i2.style.transform = `translate(120%, 0%)`;
                imob2.style.transform = `translate(120%, 0%)`;
            }
            if (-mainRect.top > third * 2.2 && -mainRect.top < third * 3) {
                n1.style.opacity = 0;
                n2.style.opacity = 0;
                n3.style.opacity = 1;
                i1.style.transform = `translate(120%, 0%)`;
                imob1.style.transform = `translate(120%, 0%)`;
                i2.style.transform = `translate(120%, 0%)`;
                imob2.style.transform = `translate(120%, 0%)`;
            }
        }
    });



    //прослушиание скролла для ссылок

    window.addEventListener (`scroll`, () => {
        let mainRect = main.getBoundingClientRect();
        let third = mainRect.height / 3;

        if (mainRect.top > 0) {
            hsbA1.forEach ((v, i, a) => {
                a[i].classList.add (`__add--white--a__BLACK`);
            });
            hsbA2.forEach ((v, i, a) => {
                a[i].classList.remove (`__add--white--a__BLACK`);
            });
            hsbA3.forEach ((v, i, a) => {
                a[i].classList.remove (`__add--white--a__BLACK`);
            });
        }

        if (mainRect.top <= 0 && mainRect.bottom > 0) {
            //1
            if (-mainRect.top >=0 && -mainRect.top <= third * 0.5) {
                hsbA1.forEach ((v, i, a) => {
                    a[i].classList.add (`__add--white--a__BLACK`);
                });
                hsbA2.forEach ((v, i, a) => {
                    a[i].classList.remove (`__add--white--a__BLACK`);
                });
                hsbA3.forEach ((v, i, a) => {
                    a[i].classList.remove (`__add--white--a__BLACK`);
                });
            }

            //2
            if ((-mainRect.top > third * 0.5) && -mainRect.top < third * 1.5) {
                hsbA1.forEach ((v, i, a) => {
                    a[i].classList.remove (`__add--white--a__BLACK`);
                });
                hsbA2.forEach ((v, i, a) => {
                    a[i].classList.add (`__add--white--a__BLACK`);
                });
                hsbA3.forEach ((v, i, a) => {
                    a[i].classList.remove (`__add--white--a__BLACK`);
                });
            }

            //3
            if (-mainRect.top >= third * 1.5 && -mainRect.top < third * 2.5) {
                hsbA1.forEach ((v, i, a) => {
                    a[i].classList.remove (`__add--white--a__BLACK`);
                });
                hsbA2.forEach ((v, i, a) => {
                    a[i].classList.remove (`__add--white--a__BLACK`);
                });
                hsbA3.forEach ((v, i, a) => {
                    a[i].classList.add (`__add--white--a__BLACK`);
                });
            }
        }
    });



    //прослушивание кликов по ссылкам

    hsbA1.forEach ((v, i, a) => {
        a[i].addEventListener (`click`, (e) => {
            e.preventDefault ();
            let mainRect = main.getBoundingClientRect();
            let third = mainRect.height / 3;
            let y = mainRect.top + window.scrollY + 10;

            window.scrollTo (0, y);
        });
    });
    
    hsbA2.forEach ((v, i, a) => {
        a[i].addEventListener (`click`, (e) => {
            e.preventDefault ();
            let mainRect = main.getBoundingClientRect();
            let third = mainRect.height / 3;
            let y = mainRect.top + window.scrollY + 10 + third;

            window.scrollTo (0, y);
        });
    });

    hsbA3.forEach ((v, i, a) => {
        a[i].addEventListener (`click`, (e) => {
            e.preventDefault ();
            let mainRect = main.getBoundingClientRect();
            let third = mainRect.height / 3;
            let y = mainRect.top + window.scrollY + 10 + third * 2;

            window.scrollTo (0, y);
        });
    });
}







/* ---------- ********** СЕКЦИЯ FAQ ********** ---------- */


{
    // РАСКРЫТИЕ СЕКЦИЙ АККОРДЕОНА


    const trigger = Array.from (document.querySelectorAll (`.accordion-item-trigger`));
    const pointer = Array.from (document.querySelectorAll (`.pointer-item.second`));
    const content = Array.from (document.querySelectorAll (`.accordion-item-content`));


    trigger.forEach ((v, i, a) => {
        a[i].addEventListener (`click`, () => {
            pointer[i].classList.toggle (`__add--pointer-item`);
            content[i].classList.toggle (`__add--accordion-item-content`);
        });
    });
}







/* ---------- ********** FOOTER ********** ---------- */


{
    //ПРОЯВЛЕНИЕ ГАЛОЧКИ И ФОКУСА НА ЧЕКБОКСЕ


    const checkbox = document.querySelector (`.footer--div__CHECK`);
    const label = document.querySelector (`.footer--span`);
    const inp = document.querySelector (`.footer--input`);

    inp.onfocus = () => {
        console.log (2222222);
    }

    inp.onblur = () => {
        console.log (3333333);
    }


    label.addEventListener (`click`, () => {
        checkbox.classList.toggle (`w--redirected-checked`);
    });

    checkbox.addEventListener (`click`, () => {
        checkbox.classList.toggle (`w--redirected-checked`);
    });

}