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

    console.log('2',ctx);
    const option  = this.option;
    const labels: any =  [
      'Red',
      'Green',
      'Yellow',
      'Grey',
      'Blue'
    ]
    const data: any = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: [11, 16, 7, 3, 14],
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
      type: 'polarArea',
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