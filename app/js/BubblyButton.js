class BubblyButton {
  constructor () {
    this._init()
  }
  
  _init() {
    let bubblyButtons = document.getElementsByClassName("button__bubblyButton");
    for (let i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('mouseover', this.animateButton, false);
    }
  }
  
  animateButton(e) {
    e.preventDefault();
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function () {
      e.target.classList.remove('animate');
    }, 700);
  }
}

  

