<template>
  <div class="decrypt">
    <div id="topbar">Your Secret Santa Assignment is...</div>
    <h1 class="yourPerson">{{ this.res }}</h1>
    <span class="material-symbols-outlined size-10" v-on:click="muteUnmute"> {{ mute ? "music_off" : "music_note" }} </span>
  </div>
</template>

<script>
import Vue from "vue";
const CryptoJS = require("crypto-js");

export default Vue.extend({
  name: "Decrypt",
  data() {
    return {
      input: {
        encrName: "",
        pass: "",
      },
      res: "",
      errmess: "",
      mute: true,
      audio: new Audio("src/assets/WhiteChristmas.mp3"),
    };
  },
  methods: {
    muteUnmute() {
      let audio = new Audio("src/assets/WhiteChristmas.mp3")
      this.mute = !this.mute;
      if (this.mute) {
        audio.pause();
      } else {
        audio.play();
      }
    },
  },
  created() {
    this.res = CryptoJS.AES.decrypt(
      atob(this.$route.params.id),
      "2021"
    ).toString(CryptoJS.enc.Utf8);
  },
});
</script>

<style scoped>
#topbar {
  height: 100px;
  font-size: 40px;
  text-shadow: 0px 0px 8px black;
  /* font-family: "Castoro", serif; */
  padding: 20px 20px 20px 20px;
}

.decrypt {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.yourPerson {
  font-size: 100px;
  text-shadow: 0px 0px 8px black;
  /* font-family: "Castoro", serif; */
  padding: 20px 20px 20px 20px;
}

.material-symbols-outlined {
  cursor: pointer;
  user-select: none;
}

.size-10 {
  font-size: 60px;
}
</style>
