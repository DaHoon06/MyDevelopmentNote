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

  chartData: {
    _id: {updated:string}
  }[];

  option: any
  $refs: any;

  constructor() {
    super();
    Chart.register(...registerables);
    this.chartData = [{
      _id: {
        updated: ''
      }
    }]
  }
  async created(){
    await this.chartData_num();
  }

  async chartData_num() {
    const data = await this.getData();

    return '';
  }

  async getData(){
    const { data } = await Vue.axios.get('/todoList/chartData') as {data: any};
    return data;
  }

  async mounted(){
    const ctx = this.$refs['lineChart'].getContext("2d");
    const option  = this.option;

    const labels: any =  [];
    for(let i = 1; i <= 31; i++){
      labels.push(i);
    }

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
      type: 'bar',
      data: data,
      options: {
        y: {
          max: 20
        }
      }
    };
    const chart = await new Chart(ctx,config)
    chart.resize(50,50)
  }
}
</script>

<style scoped>

</style>