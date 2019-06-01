'use babel';

import MyscoopScoop from './myscoop-scoop';
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
    activeFilePath = atom.workspace.getActiveTextEditor().getPath();
    console.log(activeFilePath);
    if (activeFilePath.endsWith('.c')) {
      scoopFilePath = activeFilePath.slice(0, -2) + '_scoop.c';
      atom.workspace.open(scoopFilePath, {split: 'right'}).then(
        editor => { this.scoop.setEditor(editor); }
      );
    }
  }

};
