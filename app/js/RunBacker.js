class RunBacker {
  constructor(containerClass, upBtnClass) {
    this.containerClass = containerClass;
    this.upBtnClass = upBtnClass;
    this._init()
  };
  
  _init() {
    window.onscroll = () => {
      if (document.documentElement.clientWidth >= 820) {
        if (pageYOffset >= 800) {
        $(this.containerClass).fadeIn(300);
        } else {
          $(this.containerClass).fadeOut(300);
        }
      } else {
        $(this.containerClass).fadeOut(300);
      }
    };
    $(this.containerClass).find(this.upBtnClass).click(() => {
      $('html, body').animate({scrollTop: 0},500);
    })
  }
}
