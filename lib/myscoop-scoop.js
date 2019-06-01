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
    // this.editor = null;
  }

  setEditor(editor) {
    if (this.editor !== null) {
      atom.notifications.addError("scoop already exists");
      return;
    }

    this.editor = editor;
    this.editor.onDidDestroy(() => { this.editor = null; });
  }

  init(line) {
    this.editor.setText('int main() {\n' + line + '\n}');
  }

  // getElement() {
  //   return this.element;
  // }

}
