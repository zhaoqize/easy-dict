const mutations = {
  ADD_GLOBAL_VAR (state, payload) {
    let { screen, blessed } = payload;
    state.screen = screen;
    state.blessed = blessed;
  },
  ADD_GLOBAL_PAGE (state, payload) {
    state.page = payload;
  },
  CHANGE_ENV_WORD (state, payload) {
    state.word = payload;
  },
  CHANGE_ENV_TITLEANDTYPE (state, payload) {
    let { title, type } = payload;
    state.title = title;
    state.type = type;
  },
  CHANGE_TRANSLATE_DATA (state, payload) {
    let { inputData, outData, otherData, moreData } = payload;
    state.data.inputBox = inputData;
    state.data.outputBox = outData;
    state.data.otherBox = otherData;
    state.data.moreBox = moreData;
  },
  CHANGE_TRANSLATE_DATA_MOREBOX (state, payload) {
    state.data.moreBox = payload.data;
  },
  CHANGE_TRANSLATE_FRAME_INPUTBOX (state, payload) {
    state.frame.inputBox = payload;
  },
  CHANGE_TRANSLATE_FRAME_MOREBOX (state, payload) {
    state.frame.moreBox = payload;
  },
  CHANGE_TRANSLATE_FRAME_OPERATIONBOX (state, payload) {
    state.frame.operationBox = payload;
  },
  CHANGE_TRANSLATE_FRAME_OTHERBOX (state, payload) {
    state.frame.otherBox = payload;
  },
  CHANGE_TRANSLATE_FRAME_OUTPUTBOX (state, payload) {
    state.frame.outputBox = payload;
  },
  CHANGE_TRANSLATE_FRAME_SEARCHBTN (state, payload) {
    state.frame.searchBtn = payload;
  }
}

module.exports = mutations;