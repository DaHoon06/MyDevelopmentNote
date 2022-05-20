<template>
  <div id="chart-view-container">
    <section class="h-100 mt-5">
      <div class="container-fluid w-75 h-100 bg-white rounded-lg shadow-lg p-4">
        <div class="row">
          <div class="col-12 text-left pb-3">
            <b-form-radio-group
                v-model="type"
                :options="options"
                :state="state"
                class="font-weight-bold selectedType"
                @change="getChartData"
                name="radio-validation">
              <input
                  type="date"
                  v-model="date"
                  @change="getChartData"
                  :max="max[0]"
                  class="ml-3 font-weight-bold pl-1 pr-1"
                  id="calender"
              >
            </b-form-radio-group>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <div class="p-2 chart-title rounded small shadow font-weight-bold mb-5" v-if="this.type === 'date'">
              날짜별 유입량
            </div>
            <div class="p-2 chart-title rounded small shadow font-weight-bold mb-5" v-else>
              시간별 유입량
            </div>
          </div>
          <div class="col-6">
            STACK CHART TEST
          </div>
          <div class="col-3"></div>
        </div>
        <div class="row mb-5">
          <div class="row m-auto" id="chart-container">
            <div>
              <canvas id="myChart" width="400" height="170"></canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  name: "stackChart",
  props: {
    surveyId: String,
  },
  data: () => ({
    date: null,
    max: [],
    type: 'date',
    myChart: Chart | undefined,
    options: [
      { text: '시간별', value: 'hour' },
      { text: '날짜별', value: 'date' },
    ]
  }),
  created () {
  },
  methods: {
    async getCurrentDate () {
      const { data: { result, date, yyyymmdd } } = await this.axios.get('/svy/current-date',{});
      if (this.date === null) {
        this.date = yyyymmdd;
        this.max = date.split('T');
      }
    },
    async getChartData() {
      await this.getCurrentDate();
      await this.getChartDateList();
    },
    async getChartDateList() {
      const { data } = await this.axios.get('/svy/real-time-chart',{
        params: {
          date: this.date,
          type: this.type,
        }
      });
      if(this.type === 'date') {
        this.makeChartDate(data);
      } else if(this.type === 'hour') {
        this.makeChartHour(data);
      }
    },
    makeChartDate(dataList) {
      const labels = [];
      const chartData = [];

      for(let i = 0; i < dataList.length; i++) {
        labels.push(dataList[i].mmdd);
        chartData.push(dataList[i].count);
      }

      const data = {
        labels: labels.reverse(),
        datasets: [
          {
            tension: 0.3,
            backgroundColor: 'rgba(77,130,245,0.2)',
            borderColor: 'rgba(3,19,73)',
            data: chartData.reverse(),
          }
        ]
      };
      this.renderChart(data)
    },
    makeChartHour(dataList){
      const days = [];
      const chartData = [];
      for(let i = 0; i < dataList.length; i++) {
        days.push(dataList[i].mmdd.split('-'));
        chartData.push(dataList[i].count);
      }
      const data = {
        labels: days.reverse(),
        datasets: [
          {
            tension: 0.3,
            backgroundColor: 'rgba(77,130,245,0.2)',
            borderColor: 'rgba(3,19,73)',
            data: chartData.reverse(),
          }
        ]
      };
      this.renderChart(data)
    },
    renderChart(data) {
      const ctx = document.getElementById('myChart').getContext("2d");
      const config = this.lineChartOptions(data);
      if(this.myChart) {
        this.myChart.destroy();
      }
      // this.myChart = new Chart(ctx,config);

      this.myChart = new Chart(ctx,{
        data: {
          datasets: [{
            type: 'bar',
            label: 'Bar Dataset',
            data: [10, 20, 30, 40]
          }, {
            type: 'line',
            label: 'Line Dataset',
            data: [13, 15, 30, 11],
          }],
          labels: ['January', 'February', 'March', 'April']
        },

        options: {
          plugins:{
            legend: {
              display: false
            },
          },
          fill: true,
          scales: {
            xAxis: {
              stacked: true,
              ticks: {
                authSkip: true,
                maxTicksLimit: 14,
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'COUNT'
              }
            },
          },
        }
      })
    },

    lineChartOptions(data) {
      return {
        type: 'line',
        data: data,
        options: {
          plugins:{
            legend: {
              display: false
            },
          },
          fill: true,
          scales: {
            xAxis: {
              ticks: {
                authSkip: true,
                maxTicksLimit: 14,
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'COUNT'
              }
            },
          },
        },
      };
    },

  },
  computed: {
    state() {
      return Boolean(this.type)
    }
  },
  mounted() {
    this.getChartData();
  }

}
</script>

<style scoped>
#chart-view-container {
  min-height: 930px;
  height: 100%;
  padding-bottom: 30px;
}
#chart-container {
  border: 2px solid rgba(221, 221, 222, 0.81);
  border-radius: 10px;
  box-shadow: 2px 3px rgba(246, 245, 245, 0.81);
  width: 100%;
}
#calender {
  border: none;
  border-bottom: 2px solid gray;
}
.selectedType:hover {
  cursor: pointer;
}

.chart-title {
  background: #5e5e5e;
  color: white;
}
</style>
