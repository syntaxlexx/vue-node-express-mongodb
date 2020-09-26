<template>
  <div>
    <vs-card>
      <template #header>
        <h3>Monitor App Traffic</h3>
      </template>

      <vs-tabs alignment="center">
        <vs-tab
            v-for="(item, i) in tabs"
            :key="i"
            :label="item.name"
        >
          <div>
            <component :is="item.component"></component>
          </div>
        </vs-tab>
      </vs-tabs>

    </vs-card>
  </div>
</template>

<script>
  import Traffic from "./Traffic";
  import BrowserStats from "./BrowserStats";
  import TopPages from "./TopPages";
  import Queries from "./Queries";
  import TopQueries from "./TopQueries";
  import TopCountries from "./TopCountries";
  import TopOs from "./TopOs";

  export default {
    name: "analytics-index",
    title: "Analytics",

    components: {
      Traffic,
      BrowserStats,
      TopPages,
      Queries,
      TopQueries,
      TopCountries,
      TopOs,
    },

    data() {
      return {
        tabs: [
          { name: 'Traffic', component: 'Traffic'},
          { name: 'Browser Stats', component: 'BrowserStats'},
          { name: 'Top Pages', component: 'TopPages'},
          { name: 'Top Countries', component: 'TopCountries'},
          { name: 'Top OS', component: 'TopOs'},
          { name: 'Queries', component: 'Queries'},
          { name: 'Top Queries', component: 'TopQueries'},
        ]
      }
    }
  }
</script>

<style scoped>

</style>