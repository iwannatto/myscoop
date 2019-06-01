'use babel';

export default class Scoop {

  constructor(serializedState) {
    this.editor = null;
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
}
