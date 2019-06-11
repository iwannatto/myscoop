'use babel';

import {Flag, detect} from './detector';

export default class Scoop {

  constructor(serializedState) {
    this.source = null;
    this.editor = null;
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

  mark(flags) {
    let detected2 = [];
    for (let f of flags) {
      let marker = this.editor.markBufferRange(f.range);
      this.editor.decorateMarker(marker, {type: 'highlight', class: 'my-highlight-class'});
      let suggestion = [f.varName, f.range, marker];
      detected2.push(suggestion);

      let sourceText = this.source.getText().split('\n');
      // console.log(sourceText);
      let line = sourceText.find((l) => l.includes('int ' + f.varName));
      let i = sourceText.indexOf(line);
      let marker2 = this.source.markBufferRange([[i, 0], [i, 100]]);
      // console.log(line, i, marker2);
      this.source.decorateMarker(marker2, {type: 'highlight', class: 'my-highlight-class'});
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
      let marker = s[2];
      this.editor.decorateMarker(marker, {type: 'overlay', item: htmlElement});
    }
  }

  reset() {
    // remove markers
    for (let m of this.editor.findMarkers({})) {
      m.destroy();
    }
    for (let m of this.source.findMarkers({})) {
      m.destroy();
    }
    this.undef = [];
    this.mark(detect(this.editor));
    this.addSuggest(this.resolver.suggest());
  }

}
