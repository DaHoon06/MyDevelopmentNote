<template>
  <input v-model="count" type="text"  v-bind:placeholder="searchText" />
  <button type="button" @click="handleClickPlus">+</button>
  <button type="button" @click="handleClickMinus">-</button>
  {{ searchText }}
  count : {{ this.count }}
</template>

<script>
export default {
  name: "SearchComponent",
  created() {

  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    createdAlert() {
      alert('TEST');
    },
    handleClickPlus() {
      this.count = this.count + 1;
    },
    handleClickMinus() {
      this.count -= 1;
    }
  },
  mounted() {

  },
  props: {
    searchText: String,
  }

}
</script>

<style scoped>

</style>