'use babel';

import MyscoopView from './myscoop-view';
import { CompositeDisposable } from 'atom';

export default {

  scoopEditor: null,
  // myscoopView: null,
  // modalPanel: null,
  subscriptions: null,

  activate(state) {
    // this.myscoopView = new MyscoopView(state.myscoopViewState);
    // this.modalPanel = atom.workspace.addModalPanel({
    //   item: this.myscoopView.getElement(),
    //   visible: false
    // });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'myscoop:scoop': () => this.toggle()
    }));
  },

  deactivate() {
    // this.modalPanel.destroy();
    this.subscriptions.dispose();
    // this.myscoopView.destroy();
  },

  serialize() {
    return {
      myscoopViewState: this.myscoopView.serialize()
    };
  },

  toggle() {
    activeFileName = atom.workspace.getActiveTextEditor().getTitle();
    if (activeFileName.endsWith('.c')) {
      scoopFileName = activeFileName.slice(0, -2) + "_scoop.c";
      atom.workspace.open(scoopFileName, {split: 'right'}).then(
        textEditor => { this.scoopEditor = textEditor; }
      );
    }
  }

};
