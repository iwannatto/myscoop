'use babel';

export default class MyscoopScoop {

  constructor(serializedState) {
    this.editor = null;
    // // Create root element
    // this.element = document.createElement('div');
    // this.element.classList.add('myscoop');
    //
    // // Create message element
    // const message = document.createElement('div');
    // message.textContent = 'The Myscoop package is Alive! It\'s ALIVE!';
    // message.classList.add('message');
    // this.element.appendChild(message);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
  }

  setEditor(editor) {
    if (this.editor !== null) {
      atom.notifications.addError("scoop already exists");
      return;
    }

    this.editor = editor;
  }

  // getElement() {
  //   return this.element;
  // }

}
