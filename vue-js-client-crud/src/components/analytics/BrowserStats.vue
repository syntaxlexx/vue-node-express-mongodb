<script>
  import { analyticsMixin } from "@/libs/analytics/analyticsMixin";
  import { Doughnut } from "vue-chartjs";

  export default {
    name: "Analytics-BrowserStats",
    title: "Analytics - Browser Stats",

    extends: Doughnut,

    mixins: [
      analyticsMixin,
    ],

    data() {
      return {
        decoratorKey: 'browser-stats',
      }
    },

    watch: {
      info(val) {
        if(val) {
          this.drawChart()
        }
      }
    },

    methods: {
      getPaginatorOptions() {
        return {}
      },

      drawChart() {
        let labels = _.map(this.info.data, it => {
          let name = it._id || 'others';
          return name.toUpperCase()
        })

        let values = _.map(this.info.data, it => {
          return it.count;
        })

        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: "Browser Stats",
              backgroundColor: ["#41B883", "#ffe600", "#E46651", "#00D8FF", "#00a6ff", "#ff6f00"],
              data: values,
            }
          ],
          hoverBackgroundColor: "red",
          hoverBorderWidth: 10,
        }

        this.renderChart(this.chartData, {
          ...this.chartOptions,
          hoverBorderWidth: 20,
          title: {
            display: true,
            text: 'Browser Stats'
          }
        })
      }
    },

    mounted () {
      //
    }
  }
</script>

<style scoped>

</style>