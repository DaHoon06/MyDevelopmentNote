<template>
  <div class="hello">
    asdasd
    <h1>{{ msg1 }}</h1>
    {{ num }}
  </div>
</template>

<script>
export default {

  name: 'HelloWorld',
  props: {
    msg: String,
    num: Number
  },
  data() {
    return {
      msg1: '시작',
      newNum: 0,
    }
  },
  methods: {
      test2() {

      },
      test(num) {
        console.log('TEST')
        this.newNum = num
        switch (this.newNum) {
          case 1:
            return this.msg1 = '화면1';
          case 2:
            return this.msg1 = '화면2';
          case 3:
            return this.msg1 = '화면3';
          case 4:
            return this.msg1 = '화면4';
          case 5:
            return this.msg1 = '화면5';
          default:
            return this.ms1 = '끝';
        }
      }
  },

  watch: {
    num: function() {
      this.test(this.num);
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
