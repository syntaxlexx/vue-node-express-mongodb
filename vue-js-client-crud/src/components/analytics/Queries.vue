<template>
  <div>
    <div class="tw-flex tw-justify-between tw-my-4">
      <div>
        <div class="tw-flex">
          <vs-input
              placeholder="Search (term)"
              icon="mdi-magnify"
              v-model="search"
          />

          <vs-button
              radius
              color="primary"
              type="border"
              icon="mdi-magnify"
              @click="page = 1; get();"
          ></vs-button>
        </div>

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

      <vs-paginator
          v-if="meta"
          :meta="meta"
          @change="handlePageChange"
      ></vs-paginator>

    </div>

    <vs-table stripe :data="list">
      <template slot="header">
        <div class="tw-w-full tw-flex tw-items-center tw-justify-between">
          <h3>Latest Queries</h3>
          <vs-button
              radius
              size="small"
              color="warning"
              type="border"
              icon="mdi-cached"
              @click="page = 1; get();"
          >
          </vs-button>
        </div>
      </template>
      <template slot="thead">
        <vs-th>#</vs-th>
        <vs-th>Date</vs-th>
        <vs-th>Term</vs-th>
        <vs-th>Query String</vs-th>
        <vs-th>URL</vs-th>
        <vs-th>Country</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr v-for="(item, i) in data" :key="i" >
          <vs-td>
            {{ i + 1 }}.
          </vs-td>
          <vs-td>
            <div>{{ formatDate(item.createdAt) }}</div>
            <small class="tw-ml-1 tw-italic">~ {{ formatDateInterval(item.createdAt) }}</small>
          </vs-td>
          <vs-td :data="item.term">
            <div>{{ item.term }}</div>
          </vs-td>
          <vs-td :data="item.query_string">
            <div>{{ item.query_string }}</div>
          </vs-td>
          <vs-td :data="item.url">
            <div>{{ item.url }}</div>
            <small>{{ item.domain }}</small>
          </vs-td>
          <vs-td :data="item.country">
            <div>{{ item.country }}</div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
  import { analyticsMixin } from "@/libs/analytics/analyticsMixin";

  export default {
    name: "Analytics-Queries",
    title: "Analytics - Queries",

    mixins: [
      analyticsMixin,
    ],

    data() {
      return {
        decoratorKey: 'queries',
      }
    },

    methods: {

    }
  }
</script>

<style scoped>

</style>