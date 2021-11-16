<template>
  <div>
    <canvas class="statistics-charts-line" ref="lineChart" id="myChart"></canvas>
  </div>
</template>


<script lang="ts">
import {Chart, registerables} from 'chart.js';
import {Component, Vue} from "vue-property-decorator";

@Component
export default class ChartIndex extends Vue {

  option: any
  $refs: any;

  constructor() {
    super();
    Chart.register(...registerables);
  }

  async mounted(){
    const ctx = this.$refs['lineChart'].getContext("2d");
    const option  = this.option;

    const labels: any =  [
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
      '일요일'
    ]
    const data: any = {
      labels: labels,
      datasets: [{
        label: '진행 상황',
        data: [11, 16, 7, 3, 14,12,8],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 205, 86)',
          'rgb(201, 203, 207)',
          'rgb(54, 162, 235)'
        ]
      }]
    };

    const config: any = {
      type: 'line',
      data: data,
      options: {
      }
    };
    const chart = await new Chart(ctx,config)
    chart.resize(50,50)
  }
}
</script>

<style scoped>

</style>