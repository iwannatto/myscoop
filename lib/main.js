'use babel';

import MyscoopScoop from './scoop';
import { CompositeDisposable } from 'atom';

export default {

  scoop: null,
  subscriptions: null,

  activate(state) {
    this.scoop = new MyscoopScoop();

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'myscoop:scoop': () => this.pick()
    }));
  },

  deactivate() {
    this.scoop.destroy();
    this.subscriptions.dispose();
  },

  serialize() {
    return {
      myscoopViewState: this.scoop.serialize()
    };
  },

  pick() {
    // if file is 'hoge.c', open 'hoge_scoop.c'
    let activeEditor = atom.workspace.getActiveTextEditor();
    let activeFilePath = activeEditor.getPath();
    if (!activeFilePath.endsWith('.c')) {
      atom.notifications.addError('this file is not c');
      return;
    }

    let row = activeEditor.getCursorBufferPosition().row;
    let line = activeEditor.lineTextForBufferRow(row);

    let scoopFilePath = activeFilePath.slice(0, -2) + '_scoop.c';
    atom.workspace.open(scoopFilePath, {split: 'right'}).then(
      editor => {
        this.scoop.setEditor(editor);
        this.scoop.init(line);
      }
    );
  }

};