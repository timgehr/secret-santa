import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    names: [],
    assignments: [],
    pastAssignments: null,
    pairs: []
  },
  mutations: {
    generateNamesList(state, payload) {
      let gotNames = payload.names
      let pastAssignments = payload.pastAssignments
      let shuffle = () => {
        state.names = shuffleArray(gotNames)
        for (let i = 0; i < state.names.length - 1; i++) {
          state.assignments[i] = state.names[i+1]
        }
        state.assignments[state.names.length-1] = state.names[0]
        state.assignments, state.names = shuffleTwoArrays(state.assignments, state.names)
        state.pairs = []
        for (let i = 0; i < state.names.length; i++) {
          state.pairs.push({name: state.names[i], assignment: state.assignments[i]})
        }

      }

      shuffle();
      
      
      if (pastAssignments !== null) {
        let runs = 0
        let good = false
        while (runs < 100 && !good) {
          runs++
          good = true
        for (let i = 0; i < state.names.length; i++) {
          if ( pastAssignments[state.names[i]].includes(state.assignments[i])) {            
            shuffle();
            i = 0
            good = false
          }
        }
      }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array
}

function shuffleTwoArrays(array1, array2) {
  for (let i = array1.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp1 = array1[i];
      array1[i] = array1[j];
      array1[j] = temp1;

      
      let temp2 = array2[i];
      array2[i] = array2[j];
      array2[j] = temp2;
  }
  return array1, array2
}