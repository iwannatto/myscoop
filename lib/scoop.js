'use babel';

export default class Scoop {

  constructor(serializedState) {
    this.source = null;
    this.editor = null;
    this.undef = [];
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    // this.editor = null;
  }

  setEditor(source, editor) {
    this.source = source;

    if (this.editor !== null) {
      atom.notifications.addError("scoop already exists");
      return;
    }

    this.editor = editor;
    this.editor.onDidDestroy(() => { this.editor = null; });
  }

  init(line) {
    this.editor.setText('int main() {\n' + line + '\n  return 0;\n}\n');
  }

  mark(detected) {
    this.undef = this.undef.concat(detected);
    for (let d of detected) {
      // console.log(d[1]);
      let marker = this.editor.markBufferRange(d[1]);
      this.editor.decorateMarker(marker, {type: 'highlight', class: 'my-highlight-class'})
    }
  }
}
