$(document).ready(()=> {
  
  /**
   * Основное меню в хедере
   */
  const mainMenu = (() => {
    //Создание меню
    const menu = new Menu('mainMenu',
        [
          new SubMenu('Услуги', '#', 'mainMenuSub', 'mainMenuSubLi', [
            new MenuItem('Проводка в квартире и доме', '#housesAppartments'),
            new MenuItem('Проводка в деревянном доме', '#woodenHouses'),
            new MenuItem('Коммерческие объекты', '#commercial'),
            new MenuItem('Разные', '#'),
          ]),
          new MenuItem('Цены', '#'),
          new MenuItem('Наши&nbsp;работы', '#'),
          new MenuItem('Отзывы', '#'),
          new MenuItem('Контакты', '#'),
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
      if (scrollTop > lastScrollTop) {
        $header.hide('slide', {direction: 'up'}, 200);
      }
      if (scrollTop < lastScrollTop){
        $header.show('slide', {direction: 'up'}, 200);
      }
      lastScrollTop = scrollTop;
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
            new MenuItem('Разные', '#'),
          ]),
          new MenuItem('Цены', '#'),
          new MenuItem('Наши&nbsp;работы', '#'),
          new MenuItem('Отзывы', '#'),
          new MenuItem('Контакты', '#'),
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
   * Управление секцией serices
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
    /**
     * Вызов потфолио во всплывающем окне
     */
    $('.jsPortfolioModalTrigger').click((e) => {
      new Portfolio('../json/portfolioModal.json', '#modalPortfolioScreen', true, e.target.dataset.category);
    });
    
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
   * Управление модальным окном request
   */
  const request = (() => {
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
  
    new LengthChecker ('#request');
    $requestContainer
        .find('input[name="phone"]')
        .mask('+7 (000) 000-0000')
  })();
  //Анимированная кнопка заказать
  new BubblyButton();
});
