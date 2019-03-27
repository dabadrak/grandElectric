$(document).ready(()=> {
  
  /**
   * Основное меню в хедере
   */
  const mainMenu = (() => {
    //Создание меню
    const menu = new Menu('mainMenu',
        [
          new SubMenu('Услуги', '#servicesTabs', 'mainMenuSub', 'mainMenuSubLi', [
            new MenuItem('Проводка в квартире и доме', '#housesAppartments'),
            new MenuItem('Проводка в деревянном доме', '#woodenHouses'),
            new MenuItem('Коммерческие объекты', '#commercial'),
            new MenuItem('Разные', '#servicesOther'),
          ]),
          new MenuItem('Цены', '#prices'),
          new MenuItem('Наши&nbsp;работы', '#portfolio'),
          new MenuItem('Отзывы', '#about'),
          new MenuItem('Контакты', '#footer'),
        ]
    );
    //Добавление меню
    const $mainMenuContainer = $('#mainMenu');
    $mainMenuContainer.append(menu._render());
  
    //Прячет меню при прокрутке вниз и показывает при прокрутке вверх
    const $header = $('#header');
    let lastScrollTop = 0;
    $(window).scroll(() => {
      let scrollTop = $(this).scrollTop();
      if (scrollTop > lastScrollTop && scrollTop < lastScrollTop + 110 && scrollTop > lastScrollTop + 20) {
        $header.hide('slide', {direction: 'up'}, 200);
      }
      if (scrollTop < lastScrollTop){
        $header.show('slide', {direction: 'up'}, 200);
      }
      lastScrollTop = scrollTop;
    });
    
    //Показывает меню при поднятии мышки к верху страницы
    $(document).mousemove(() => {
      if (event.screenY < 150) {
        $header.show('slide', {direction: 'up'}, 200);
      }
    });
    
    //Разворачивает субменю
    const $subMenuContainer = $('.mainMenuSubLi');
    $subMenuContainer.hover(()=> {
      $subMenuContainer
          .toggleClass('active')
          .find('ul')
          .fadeToggle(200)
    });
  })();
  
  /**
   * Мобильное меню
   */
  const mobileMenu = (() => {
    //Создание мобильного меню
    const mobileMenu = new Menu('mobileMenu',
        [
          new SubMenu('Услуги', '#', 'mobileMenuSub', 'mobileMenuSubLi', [
            new MenuItem('Проводка в квартире и доме', '#housesAppartments'),
            new MenuItem('Проводка в деревянном доме', '#woodenHouses'),
            new MenuItem('Коммерческие объекты', '#commercial'),
            new MenuItem('Разные', '#servicesOther'),
          ]),
          new MenuItem('Цены', '#price'),
          new MenuItem('Наши&nbsp;работы', '#portfolio'),
          new MenuItem('Отзывы', '#about'),
          new MenuItem('Контакты', '#footer'),
        ]
    );
    //Добавление мобильного иеню
    const $mobileMenuContainer = $('#mobileMenu');
    $mobileMenuContainer.append(mobileMenu._render());

    //Показать меню при нажатии на кнопку меню
    const $mobileMenuSideBar = $('.mobileMenuSideBar');
    const $mobileMenuContentMask = $('#mobileMenuContentMask');
    $('#mobileMenuBtn').click(() => {
      $mobileMenuSideBar.show('slide', {direction: 'right'}, 200);
      $mobileMenuContentMask.fadeIn();
      $('#header').hide('slide', {direction: 'up'}, 200);
    });

    //Скрыть меню при нажатии на кнопку закрыть
    $('#mobileMenuCloseBtn').click(() => {hideMenu()});
    $mobileMenuContentMask.click(() => {hideMenu()});
  
    //Скрыть меню при выборе пункта
    const $mobileMenuSubLiA = $('.mobileMenuSubLi>a');
    $mobileMenuContainer.find('a').not($mobileMenuSubLiA).click(() => {hideMenu()});
    $mobileMenuContentMask.click(() => {hideMenu()});
    $mobileMenuSubLiA.click(() => {
      $('.mobileMenuSub').slideToggle(200)
    });
  
    /**
     * Скрывает меню плавным слайдом
     */
    function hideMenu() {
      $mobileMenuSideBar.hide('slide', {direction: 'right'}, 200);
      $mobileMenuContentMask.fadeOut();
    }
  })();
  
  /**
   * Управление секцией services
   */
  const services = (() => {
    //Аккордионы мини прайсов
    $('#accordionWiring').accordion(100);
    $('#accordionTools').accordion(100);
    $('#accordionCommercial').accordion(100);
    
    //Табы с мини прайсами
    $('#servicesTabs').tabs({
      active: 0,
      hide: {
        effect: "fade",
        duration: 200
      },
      show: {
        effect: "fade",
        duration: 200
      }
    });
    
    //Подсветка лэйбла активного таба
    $('.servicesPriceNav').click('li', (e) => {
      $('.servicesPriceNav')
          .find('.active')
          .removeClass('active');
      e.target.parentNode.classList.add('active')
    });
  })();
  
  /**
   * Управление секцией sericesBig
   */
  const servicesBig = (() => {
  
  $('.servicesCarousel').owlCarousel({
    autoplay: true,
    nav: false,
    dots: false,
    items: 1,
    loop: true,
    margin: 1,
      }
  );
    /**
     * Эффекты в servicesOther
     */
    const $servicesBigOther = $('.servicesBigOther');
    if ($(window).width() < 850) {
      $servicesBigOther.on('click', '.item', function () {
        $(this).find('.mask').toggleClass('active');
      });
    } else {
      $servicesBigOther.on('mouseenter mouseleave', '.item', function () {
        $(this).find('.mask').toggleClass('active');
      })
    }
  })();
  
  /**
   * Управление секцией portfolio
   */
  const portfolio = (() => {
    new Portfolio('../json/portfolioModal.json', '#portfolio')
  })();
  
  /**
   * Управление модальным окном и секциями request
   */
  const requestModal = (() => {
    const $requestContainer = $('#requestModal');
    
    $('.requestTrigger').click(() => {
      $requestContainer.addClass('active');
      $('html').css('overflow', 'hidden');
    });
    $($requestContainer).click(() => {
      if (event.target.id === 'requestModal') {
        $requestContainer.removeClass('active');
        $('html').css('overflow', 'auto');
      }
    $('#requestClose').click(() => {
      $requestContainer.removeClass('active');
      $('html').css('overflow', 'auto');
    })
    });
  
    new LengthChecker ('#requestModalForm');
    new LengthChecker ('#requestForm1');
    new LengthChecker ('#requestForm2');
    $('.requestTel').mask('+7 (000) 000-00-00')
  })();
  
  /**
   * Управление секцией offers
   */
  const offers = (() => {
    const $offersCarouselContainer =  $('#offers');
    $offersCarouselContainer.owlCarousel({
      items: 1,
      loop: true,
      dots: true
        }
    );
    $('#offerNext').click(() => {
      $offersCarouselContainer.trigger('next.owl.carousel')
    });
    $('#offerPrev').click(() => {
      $offersCarouselContainer.trigger('prev.owl.carousel')
    });
    
  })();
  
  /**
   * Управление секцией about
   */
  const about = (() => {
    const $aboutCarouselContainer =  $('#aboutFeedbacks');
    $aboutCarouselContainer.owlCarousel({
          items: 1,
          loop: true,
          dots: false,
          responsive: {
            600: {
              items: 2
            }
          }
        }
    );
    $('#aboutFeedbacksNext').click(() => {
      $aboutCarouselContainer.trigger('next.owl.carousel')
    });
    $('#aboutFeedbacksPrev').click(() => {
      $aboutCarouselContainer.trigger('prev.owl.carousel')
    });
  })();
  
  //Вызов портфолио
  $('.jsPortfolioModalTrigger').click((e) => {
    new Portfolio('../json/portfolioModal.json', '#modalPortfolioScreen', true, e.target.dataset.category);
  });
  
  //Прайс из JSON
  new Price($('#priceAccordion'), '../json/price.json');
  
  //Анимированная кнопка заказать
  new BubblyButton();
  
  //Появляющаяся при прокрутке кнопка наверх и заказть звонок
  new RunBacker('.callbackWrapper', '.callbackUp');
});
