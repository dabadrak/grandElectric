/**
 * Элеменет меню
 * @param {string} label Название элемента
 * @param {string} href Ссылка
 */
class MenuItem{
  constructor(label, href) {
    this.label = label;
    this.href = href;
  }
  
  /**
   * Отображает элемент
   * @returns {string} HTML код элемента
   * @private
   */
  _render() {
    return `<li><a href="${this.href}">${this.label}</a></li>`
  }
}