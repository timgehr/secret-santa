<template>
  <div class="page">
    <div class="names-list flex column">
      <div class="flex last-year" v-for="name in names" :key="name">
        <div class="flex santa column">
          <img src="/img/santanobg.fc5e0c3c.png" />
          <p>{{ name }}</p>
        </div>
        <div>
          <select v-model="pastAssignments[name][0]" class="past-assignment">
            <option
              v-for="name in names.filter(n => n !== name)"
              :key="name"
              :value="name"
              class="past-option"
            >
              {{ name }}
            </option>
          </select>
        </div>
        <div>
          <select v-model="pastAssignments[name][1]" class="past-assignment">
            <option
              v-for="name in names.filter(n => n !== name)"
              :key="name"
              :value="name"
              class="past-option"
            >
              {{ name }}
            </option>
          </select>
        </div>
        <div>
          <select v-model="pastAssignments[name][2]" class="past-assignment">
            <option
              v-for="name in names.filter(n => n !== name)"
              :key="name"
              :value="name"
              class="past-option"
            >
              {{ name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <button class="reveal" v-on:click="encryptThatJawn">Generate</button>
  </div>
</template>

<script>
import Vue from "vue";
import "../assets/styles.css";

export default Vue.extend({
  data() {
    return {
      res: "",
      errmess: "",
      pastAssignments: Object.fromEntries(
        this.$store.state.names.map((name) => [name, ["", ""]])
      ),
      year: new Date().getFullYear(),
    };
  },
  methods: {
    encryptThatJawn() {
      let payload = {
        names: this.names,
        pastAssignments: JSON.parse(JSON.stringify(this.pastAssignments)),
      };
      this.$store.commit("generateNamesList", payload);
      this.$router.push("generated");
    },
  },
  computed: {
    names() {
      return this.$store.state.names;
    },
    assignments() {
      return this.$store.state.assignments;
    },
  },
});
</script>

<style scoped>
.santa { 
  width: 80px;
}

.column {
  flex-direction: column !important;
}

.names-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin: 0px;
  width: 100%;
}

.last-year {
  margin-top: 20px;
  width: 50%;
  justify-content: space-between;
}

.past-assignment {
  font-size: 20px;
  height: 40px;
  text-align: center;
  width: 300px;
  background: rgb(35, 49, 67);
  border: 0px;
  border-radius: 10px;
}

.past-option {
  background: rgb(35, 49, 67);
  color: white;
  border: none;
  outline: none;
  border-radius: 10px;
}

.page{
  padding: 50px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.reveal{
  margin-top: 100px;
  border-radius: 10px;
  transition: 0.2s;
}

.reveal:active{
  margin-top: 104px;
  background: rgb(158, 0, 0);
  box-shadow: 0px 6px 0px rgb(109, 0, 0);
}
</style>
