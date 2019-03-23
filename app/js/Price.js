class Price {
  constructor (container, source) {
    this.container = container;
    this.source = source;
    this.items = null;
    this._init();
  }
  
  _init() {
    fetch(this.source)
        .then(result => {return result.json()})
        .then(data => {
          this.items = data;
          this._render(this.items, this.container);
          this.container.accordion({
            heightStyle: "content",
            active: 4
          });
        })
  }
  
  _render(items, container) {
    items.forEach((category, idx) => {
      const $heading = $(`<h3>${category.category}</h3>`);
      const $itemsContainer = $('<div/>');
      const $table = $('<table border=0, cellspacing=0, cellpadding=0/>');
      const $legend = $('<tr class="price-legend"><td>Наименование</td><td>Цена</td><td>Ед.</td></tr>');
      $heading.appendTo(container);
      $itemsContainer.appendTo(container);
      $table.appendTo($itemsContainer);
      $legend.appendTo($table);
      category.contains.forEach((item) => {
        const $tr = $('<tr/>');
        $(`<td>${item[0]}</td>`).appendTo($tr);
        $(`<td>${item[1]}</td>`).appendTo($tr);
        $(`<td>${item[2]}</td>`).appendTo($tr);
        $tr.appendTo($table);
      });
    })
  }
}