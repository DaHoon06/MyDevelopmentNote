<template>
  <div class="home">
    <div class="select-container">
      <b-row align-h="around">
        <b-col cols="6" class="card-content">
          <b-card bg-variant="dark" text-variant="white" class="shadow" >
            <template #header>
              <p class="h1">조사 참여하기</p>
            </template>
            <b-card-img  src="https://cdn.pixabay.com/photo/2018/03/19/09/25/feedback-3239454_960_720.jpg" width="300px" height="300px"/>
            <template #footer>
              <b-button to="survey" ref="#" variant="success">조사 참여</b-button>
            </template>
          </b-card>
        </b-col>
        <b-col cols="6" class="card-content">
          <b-card bg-variant="dark" text-variant="white" class="shadow">
            <template #header>
              <p class="h1">조사 결과보기</p>
            </template>
            <b-card-img src="https://cdn.pixabay.com/photo/2016/12/01/09/12/discussion-1874792_960_720.jpg" width="300px" height="300px"/>
            <template #footer>
              <b-button to="chart" variant="primary">결과 집계</b-button>
            </template>

          </b-card>
        </b-col>
      </b-row>
    </div>
    <form @submit.prevent="test">
      <input @change="upload" type="file" />
      <button type="submit">전송</button>
    </form>


  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data:() => ({
    fileDataList: '',
    file: [],
  }),
  methods: {
    async test(fileData) {
      const data = await this.axios({
        url: '/test/upload',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: fileData
      })
    },

    upload(e) {
      this.fileDataList = e.target.files;
      const fileData = new FormData();

      for(const formData of this.fileDataList) {
        fileData.append('file',formData);
      }
      this.test(fileData)
    }
  }
}
</script>
<style scoped>
.select-container{
  min-height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background: #ebeeef;
  align-items: center;
}
.card-content{
  position: relative;
}
</style>

