
export default class SortableTable {
  element;
  subElements = {};
  
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplate()); 
    this.selectSubElements();
  }

  createElement(template) {
    
    const element = document.createElement('div');
    element.innerHTML = template;
    this.lastTable = element;
    return element.firstElementChild;
  }

  selectSubElements() {
    this.element.querySelectorAll('[data-element]').forEach(element => {
      this.subElements[element.dataset.element] = element;
    });
  }

  createTemplate() {
    return ` 
  <div  data-element="productsContainer" class="products-list__container">
  <div class="sortable-table">

    <div data-element="header" class="sortable-table__header sortable-table__row">
    ${this.createHeaderTemplate()}
    </div> 
    <div id = "glav" data-element="body" class="sortable-table__body">
        ${this.createBodyTemplate()}
      </div>
  </div>
  </div>
    `; 
  }

  createHeaderTemplate() {
    return this.headerConfig.map((i)=>{         
      return `
      <div class="sortable-table__cell" data-id=${i.id} data-sortable="false">
        <span>${i.title}</span>
      </div>
    `
    
    }).join('') ;
  }

  createBodyTemplate() {
    return this.data.map(this.createRowTemplate).join('');
  }

  createRowTemplate = (data) => {
    return `
      <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
        ${this.createRowContentTemplate(data)}
      </a>
    `;
  }

  createRowContentTemplate = (data) => {
    return this.headerConfig.map((columnConfig)=>{ 
      if (columnConfig.template) {
        return columnConfig.template(data);
      }

      const fieldName = columnConfig.id;
      const fieldValue = data[fieldName];
  
      return `<div class="sortable-table__cell">${fieldValue}</div>`;
    }).join('') ;
  }

  sort(field = 'title', order = 'desc') {
    const orders = {
      'desc': 1,
      'asc': -1,
    };

    const sortedData = [...this.data].sort((itemA, itemB) => {
      const k = orders[order];
      const valueA = itemA[field];
      const valueB = itemB[field];

      if (typeof valueA === 'string') {
        return k * valueB.localeCompare(valueA, 'ru-en', {caseFirst: 'upper'});
      }

      return k * (valueB - valueA);
    });  

    this.data = sortedData;
    this.subElements.body.innerHTML = this.createBodyTemplate(sortedData);
  }

  destroy() {
    this.element.remove();
  }
}

