<template>
  <div>
    <div style="font-size: 18px" class="text-center my-4 mb-5 mt-5">
      <h3 class="font-weight-bold">PMI DevTutorials</h3>
    </div>
    <b-container class="mt-2">
      <b-row>
        <b-col cols="12" class="text-left">
          <p class="text-center">설문이 종료되었습니다. 감사합니다.</p>
          <p class="text-right">
            <router-link to="/chart">
              <b>결과보기</b>
            </router-link>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "survey-end"
}
</script>

<style scoped>

</style>