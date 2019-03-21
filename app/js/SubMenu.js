/**
 * Модуль субменю
 * @param {string} label Подпись заголовка субменю
 * @param {string} href Ссылка заголовка субменю
 * @param {string} ulClass Класс <ul> меню
 * @param {string} liClass Класс <li> заголовка субменю
 * @param {array} items Элементы субменю
 */
class SubMenu extends Menu {
  constructor (label, href, ulClass, liClass, items) {
    super (ulClass, items);
    this.label = label;
    this.href = href;
    this.liClass = liClass;
  }
  
  /**
   * Отображает субменю
   * @returns {jQuery} Субменю
   * @private
   */
  _render() {
    let $li = $(`<li class="${this.liClass}"/>`);
    let $a = $(`<a href="${this.href}">${this.label}</a>`);
    let $subMenu = super._render();
    $a.appendTo($li);
    $subMenu.appendTo($li);
    return $li;
  }
}