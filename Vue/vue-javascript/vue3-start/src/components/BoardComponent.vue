<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>제목</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(data, index) of this.boardData" :key="index">
      <td>{{ data.seq }}</td>
      <td>{{ data.title }}</td>
    </tr>
    </tbody>

  </table>
</template>

<script>
export default {
  name: "BoardComponent",
  data() {
    return {
      boardData: [
        { seq: 1, title: 'TEST1' },
        { seq: 2, title: 'TEST2' },
        { seq: 3, title: 'TEST3' }
      ],
      fileData: [],
    }
  },
  methods: {
    async test() {
      // this.axios.get('/asdasdsad~~/@3123123',{
      //
      // })
      // .then((res) => {
      //   this.fileData = res.data();
      // })
      // .then()
      // .then()
      // .catch((e) = {
      //   alert(e),
      // });

      /*
      *  Promise
      * */

      const result = await this.axios.get('/asdasdsad~~/@3123123',{});
      this.fileData = result.data;

    }
  }
}
</script>

<style scoped>

</style>