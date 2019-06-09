'use babel';

export default class Scoop {

  constructor(serializedState) {
    this.source = null;
    this.editor = null;
    this.detector = null;
    this.resolver = null;
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

  init(aboveMain, line) {
    this.editor.setText(aboveMain + 'int main() {\n' + line + '\n  return 0;\n}\n');
  }

  mark(detected) {
    let detected2 = [];
    for (let d of detected) {
      let marker = this.editor.markBufferRange(d[1]);
      this.editor.decorateMarker(marker, {type: 'highlight', class: 'my-highlight-class'});
      d.push(marker);
      detected2.push(d);
    }
    this.undef = this.undef.concat(detected2);
  }

  addSuggest(suggestions) {
    for (let s of suggestions) {
      let htmlElement = document.createElement('div');
      let suggestionLabel = s[3];
      let suggestionElement = document.createElement('div');
      suggestionElement.appendChild(document.createTextNode(suggestionLabel));
      let suggestionFunc = s[4];
      suggestionElement.addEventListener('click', suggestionFunc);
      htmlElement.classList.add('suggestion');
      htmlElement.appendChild(suggestionElement);
      // console.log(htmlElement);
      // console.log(suggestionElement);
      let marker = s[2];
      this.editor.decorateMarker(marker, {type: 'overlay', item: htmlElement});
    }
  }

  reset() {
    // remove markers
    for (let m of this.editor.findMarkers({})) {
      m.destroy();
    }
    this.undef = [];
    this.mark(this.detector.detect());
    this.addSuggest(this.resolver.suggest());
    // remove suggestions
    // let scoopEditorElement = atom.views.getView(this.editor);
    // for (let s of )
  }

}
