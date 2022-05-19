<template>
  <div>

    <div v-if="!this.loading">
      <b-spinner label="Loading..."></b-spinner>
    </div>
    <div v-else id="chart-container">
      <section class="my-2 my-md-4">
        <div class="container-fluid bg-white rounded shadow">
          <div class="row">
            <div class="col-12 py-2 py-md-4">
              <canvas id="myChart" ref="barChart" width="400" height="400"></canvas>
            </div>
          </div>
        </div>
      </section>

      <section class="my-2 my-md-4">
        <div class="container-fluid bg-white rounded shadow">
          <div class="row">
            <div class="col-12 py-2 py-md-4">
              <div class="text-center">
                <b-table-simple caption-top small responsive>
                  <caption>설문 만족도 결과</caption>
                  <b-thead>
                    <b-tr>
                      <b-th v-for="(text, index) of satisfaction" :key="index">{{ text }}</b-th>
                    </b-tr>
                  </b-thead>
                  <tbody>
                  <b-tr>
                    <b-td v-for="(text,index) of satisfactionData" :key="index">{{text}}</b-td>
                  </b-tr>
                  </tbody>
                </b-table-simple>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 py-2 py-md-4">
              <div class="text-center">
                <b-table-simple caption-top small responsive>
                  <caption>설문 지역</caption>
                  <b-thead>
                    <b-tr>
                      <b-th v-for="(text, index) of location" :key="index">{{ text }}</b-th>
                    </b-tr>
                  </b-thead>
                  <tbody>
                  <b-tr>
                    <b-td v-for="(text,index) of locationData" :key="index">{{ text }}</b-td>
                  </b-tr>
                  </tbody>
                </b-table-simple>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  extends: Bar,
  name: "chart-component",
  data: () => ({
    chartList: null,
    loading: false,
    satisfaction: ['전혀 만족하지 않는다.','만족하지 않는다.','보통이다.','만족한다.','매우 만족한다.'],
    satisfactionData: [],
    location: ['서울','인천','경기','충청','강원','전라','경상','기타'],
    locationData: [],

  }),
  created() {
    this.loading = false;
    this.getChartData();
    this.getTableData();
    this.loading = true;
  },
  methods: {
    async getChartData() {
      const { data } = await this.axios.get('/survey/chart-data');
      this.makeChart(data)
    },
    async getTableData() {
      const { data } = await this.axios.get('/survey/table-data');
      this.SQ3DataList(data);
      this.SQ5DataList(data);
    },
    SQ3DataList(data) {
      const { SQ3_1, SQ3_2, SQ3_3, SQ3_4, SQ3_5, SQ3_6, SQ3_7, SQ3_8 } = data[0];
      this.locationData = [SQ3_1, SQ3_2, SQ3_3, SQ3_4, SQ3_5, SQ3_6, SQ3_7, SQ3_8];
    },
    SQ5DataList(data) {
      const { SQ5_1, SQ5_2, SQ5_3, SQ5_4, SQ5_5 } = data[0];
      this.satisfactionData = [SQ5_1, SQ5_2, SQ5_3, SQ5_4, SQ5_5];
    },
    maleDataList(data) {
      const maleAvg = data.filter(gender => gender._id === 1).map(answer => Math.round(answer.SQ2));
      const maleTotal = data.filter(gender => gender._id === 1).map(answer => answer.SQ1);
      return  {
        maleAvg,
        maleTotal
      }
    },
    femaleDataList(data) {
      const femaleAvg = data.filter(gender => gender._id === 2).map(answer => Math.round(answer.SQ2));
      const femaleTotal = data.filter(gender => gender._id === 2).map(answer => answer.SQ1);
      return {
        femaleAvg,
        femaleTotal
      }
    },
    makeChart(data) {
      const { maleAvg, maleTotal } = this.maleDataList(data);
      const { femaleAvg, femaleTotal } = this.femaleDataList(data);

      const ctx = document.getElementById('myChart').getContext('2d');
      this.chartList = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['평균 연령','성별 비율'],
          datasets: [
            {
              label: '남성',
              barThickness: 30,
              data: [maleAvg[0], maleTotal[0]],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgb(201, 203, 207)',
                'rgb(255, 159, 64)',
              ],
              borderWidth: 1
            },
            {
              label: '여성',
              barThickness: 30,
              data: [femaleAvg[0], femaleTotal[0]],
              backgroundColor: [
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'
              ],
              borderColor: [
                'rgb(201, 203, 207)',
                'rgb(153, 102, 255)'
              ],
              borderWidth: 1
            },
          ]
        },
        option: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  },


}
</script>

<style scoped>
#chart-container {
  width: 550px;
  margin: auto;
}
</style>