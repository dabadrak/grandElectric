/**
 * Модуль меню
 * @param {string} ulClass Класс <ul> меню
 * @param {array} items Элементы меню
 */
class Menu {
  constructor(ulClass, items) {
    this.items = items;
    this.ulClass = ulClass;
  }
  
  /**
   * Отображает меню
   * @returns {jQuery} Меню
   * @private
   */
  _render() {
    let $menu = $(`<ul class="${this.ulClass}"/>`);
    $.each (this.items, ((idx, item) => {
      if (item instanceof MenuItem || SubMenu) {
        $(item._render()).appendTo($menu);
      }
    }));
    return $menu;
  }
}