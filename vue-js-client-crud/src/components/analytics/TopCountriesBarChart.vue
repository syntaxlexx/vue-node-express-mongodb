<script>
  import { Bar } from "vue-chartjs";

  export default {
    name: "TopCountriesBarChart",

    extends: Bar,

    props: {
      chartData: {
        type: [Array, Object],
        required: true
      },
    },

    data() {
      return {
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false
        },
      }
    },

    mounted() {
      this.renderChart(this.chartData, {
        ...this.chartOptions,
        title: {
          display: true,
          text: 'Top Countries Stats'
        },
        scales: {
          xAxes: [{
            barThickness: 15,
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
      })
    }
  }
</script>

<style scoped>

</style>