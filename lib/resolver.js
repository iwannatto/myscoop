'use babel';

import Scoop from './scoop'

export default class Resolver {
  constructor(scoop) {
    this.scoop = scoop;
  }

  resolve() {
    let undef = this.scoop.undef;
    let sourceLines = this.scoop.source.getText().split('\n');
    for (let u of undef) {
      let insert = null;
      for (let i = 0; i < sourceLines.length; ++i) {
        if (sourceLines[i].trim().includes('int ' + u[0])) {
          insert = sourceLines[i] + '\n';
          break;
        }
      }

      if (insert !== null) {
        let range = [[u[1][0][0], 0], [u[1][0][0], 0]];
        console.log(range);
        this.scoop.editor.setSelectedBufferRange(range);
        console.log('a');
        this.scoop.editor.insertText(insert);
      }
    }
  }

}
