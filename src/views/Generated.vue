<template>
  <div class="generated">
    <div id="topbar">Assignments: <span>{{ (checkNoRepeats() && checkNoSelfAssignments() && checkNoRepeatOfPastAssignments()) ? "✅" : "❌" }}</span></div>
    <ul class="names-list">
      <div class="listColumn">
        <li
          class="names-list-item"
          v-for="pair in this.$store.state.pairs"
          v-on:click="copyText(pair)"
          :key="pair"
        >
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
            <span>{{ pair.name }}</span>
            <span style="margin-left: 10px;">🎁</span>
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>

<script>
import Vue from "vue";
const CryptoJS = require("crypto-js");

export default Vue.extend({
  name: "generated",
  data() {
    return {
      res: "",
      errmess: "",
    };
  },
  methods: {
    checkNoRepeats() {
      let testAssignments = new Set(this.$store.state.assignments);
      return testAssignments.size === this.$store.state.assignments.length;
    },
    checkNoSelfAssignments() {
      for (var i = 0; i < this.$store.state.assignments.length; i++) {
        if (this.$store.state.assignments[i] === this.$store.state.names[i]) {
          return false;
        }
      }
      return true;
    },
    checkNoRepeatOfPastAssignments() {
      for (var i = 0; i < this.$store.state.assignments.length; i++) {
        let name = this.$store.state.names[i];
        let assignment = this.$store.state.assignments[i];
        if (this.$store.state.pastAssignments[name].includes(assignment)) {
          return false;
        }
      }
      return true;
    },
    encryptName(name) {
      return btoa(
        CryptoJS.AES.encrypt(name, "2021").toString()
      );
    },
    copyText(pair) {
      var toBeCopied = (pair.name +  ", here's your secret santa assignment 🎁🎅🏼🎄: https://encryptedsanta.netlify.app/#/decrypt/" + this.encryptName(pair.assignment))
      navigator.clipboard.writeText(toBeCopied)
    }
  },
  mounted() {
    for(var i = 0; i < this.$store.state.assignments.length; i++){
      if (this.$store.state.assignments[i] === this.$store.state.names[i]){
        document.getElementById('app').style.backgroundColor = "rgb(95, 0, 0)";
        alert('tiddy')
      }
    }
  }
});
</script>

<style scoped>
.names-list {
  display: flex;
  flex-direction: row;
}

.names-list-item {
  padding-top: 20px;
  padding-right: 20px;
  font-size: 30px;
  height: 40px;
  text-align: justify;
}

.generated {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 200;
}
</style>
