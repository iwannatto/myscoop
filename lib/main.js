'use babel';

import Scoop from './scoop';
import Detector from './detector';
import Resolver from './resolver';
import { CompositeDisposable } from 'atom';

export default {

  scoop: null,
  detector: null,
  resolver: null,
  subscriptions: null,

  activate(state) {
    this.scoop = new Scoop();
    this.detector = new Detector(this.scoop);
    this.resolver = new Resolver(this.scoop);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'myscoop:scoop': () => this.pick(),
      'myscoop:detect': () => this.detect(),
      'myscoop:resolve': () => this.resolve(),
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

    let aboveMain = '';
    for (let i = 0; !activeEditor.lineTextForBufferRow(i).includes('main'); ++i) {
      aboveMain = aboveMain + activeEditor.lineTextForBufferRow(i) + '\n';
    }
    let selectedRow = activeEditor.getCursorBufferPosition().row;
    let selectedLine = activeEditor.lineTextForBufferRow(selectedRow);

    let scoopFilePath = activeFilePath.slice(0, -2) + '_scoop.c';
    atom.workspace.open(scoopFilePath, {split: 'right'}).then(
      editor => {
        this.scoop.setEditor(activeEditor, editor);
        this.scoop.init(aboveMain, selectedLine);
        this.detect();
        this.addSuggest();
      }
    );

  },

  detect() {
    this.scoop.mark(this.detector.detect());
  },

  addSuggest() {
    this.scoop.addSuggest(this.resolver.suggest());
  },

  resolve() {
    this.resolver.resolve();
  }

};
