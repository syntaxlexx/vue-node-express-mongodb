<template>
  <div>
    <div class="tw-flex tw-justify-end tw-my-4">
      <vs-select
          label="Items per page:"
          v-model="pageSize"
          @change="handlePageSizeChange"
      >
        <vs-select-item
            v-for="size in pageSizes"
            :key="size"
            :value="size"
            :text="size"
        />
      </vs-select>
    </div>

    <vs-table stripe :data="list">
      <template slot="header">
        <div class="tw-w-full tw-flex tw-items-center tw-justify-between">
          <h3>Top {{ pageSize }} Operating Systems</h3>
          <vs-button
              radius
              size="small"
              color="warning"
              type="border"
              icon="mdi-cached"
              @click="get();"
          >
          </vs-button>
        </div>
      </template>
      <template slot="thead">
        <vs-th>#</vs-th>
        <vs-th>OS</vs-th>
        <vs-th>Counter</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(item, i) in data" :key="i" >
          <vs-td>
            {{ i + 1 }}.
          </vs-td>
          <vs-td :data="item._id">
            <div>{{ item._id }}</div>
          </vs-td>
          <vs-td :data="item.count">
            <div>{{ item.count }}</div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <TopOsBarChart
        v-if="loaded"
        :chart-data="chartData"
        :key="chartKey"
        class="tw-mt-4"
    />

  </div>
</template>

<script>
  import { analyticsMixin } from "@/libs/analytics/analyticsMixin";
  import TopOsBarChart from './TopOsBarChart'

  export default {
    name: "TopOS",
    title: "Analytics - Top OS",

    mixins: [
      analyticsMixin,
    ],

    components: {
      TopOsBarChart,
    },

    data() {
      return {
        decoratorKey: 'top-os',
        pageSizes: [2, 5, 10, 20],
        loaded: false,
        chartKey: 1,
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
      drawChart() {
        let labels = _.map(this.info.data, it => {
          let name = it._id || 'others';
          return name
        })

        let values = _.map(this.info.data, it => {
          return it.count;
        })

        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: "Top OS Stats",
              backgroundColor: "#00D8FF",
              data: values,
            }
          ],
        }

        this.loaded = true
        this.chartKey++
      }
    },
  }
</script>

<style scoped>

</style>