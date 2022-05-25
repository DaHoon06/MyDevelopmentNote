<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :num="this.num" msg="Welcome to Your Vue.js App" />

    <div>
      <button @click="test">Up</button>
      <button @click="test2">Down</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data(){
    return {
      num: 0,
    }
  },
  methods: {
    test() {
      this.num += 1
      return this.num;
    },
    test2() {
      this.num -= 1
      return this.num;
    }
  }
}
</script>
