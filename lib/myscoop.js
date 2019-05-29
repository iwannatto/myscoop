'use babel';

import MyscoopView from './myscoop-view';
import { CompositeDisposable } from 'atom';

export default {

  myscoopView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myscoopView = new MyscoopView(state.myscoopViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myscoopView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'myscoop:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myscoopView.destroy();
  },

  serialize() {
    return {
      myscoopViewState: this.myscoopView.serialize()
    };
  },

  toggle() {
    console.log('Myscoop was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
