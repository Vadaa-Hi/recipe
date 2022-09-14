import uniqid from 'uniqid';

export default class List {
  constructor() {
    this.items = [];
  }
  deleteItem(id) {
    // 1. id gdg ID-tei ortsiin indexiig massive aas haij olno
    const index = this.items.findIndex((el) => el.id === id);
    // 2. Ug index deerh elementiig massive aas ustgana.
    this.items.splice(index, 1);
  }
  addItem(item) {
    let newItem = {
      id: uniqid(),
      item: item,
    };

    this.items.push(newItem);
    return newItem;
  }
}
