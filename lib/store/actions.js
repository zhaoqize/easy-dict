const actions = {
  updateInputBoxLabel (state, payload) {
    let { label } = payload;
    state.frame.inputBox.setLabel(label);
  },
  updateInputBoxContent (env, translate) {
    translate.frame.inputBox.setContent(env.word);
  },
  updateOutputBoxContent (state) {
    state.frame.outputBox.setContent(state.data.outputBox);
  },
  updateOtherBoxContent (state) {
    state.frame.otherBox.setContent(state.data.otherBox);
  },
  updateMoreBoxContent (state) {
    state.frame.moreBox.setContent(state.data.moreBox);
  }
}

module.exports = actions;