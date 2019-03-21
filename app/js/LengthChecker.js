class LengthChecker {
  constructor (formClass) {
    this.formClass = formClass;
    this._init(formClass);
  }
  
  _init() {
    const phoneInput = $(this.formClass).find('input[name="phone"]');
    $(this.formClass).submit(() => {
      if (!this._firstCheck(phoneInput)) {
        event.preventDefault()
      }
    });
    $(window).on('keypress', () => {
      this._secondCheck(phoneInput)
    });
  };
  
  _firstCheck(input) {
    if (!(input.val().length === 17)) {
      input.addClass('invalid')
    }
    return input.val().length === 17
  }
  _secondCheck(input) {
    if (input.val().length === 16) {
      input.removeClass('invalid')
    }
  }
}
