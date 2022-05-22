<template>
  <div class="about">
    <search-component
        :searchText="mainText"
    />
    <board-component />
  </div>
</template>

<script>
import BoardComponent from '@/components/BoardComponent.vue';
import SearchComponent from '@/components/SearchComponent.vue'

export default {
  name: 'About',
  components: {
    BoardComponent,
    SearchComponent

  },
  data() {
    return {
      mainText: '검색을 하거라.',
    }
  },


}
</script>

<style lang="scss">

</style>