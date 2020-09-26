<template>
  <div>
    <div class="tw-flex tw-justify-between tw-my-4">
      <div>
        <div class="tw-flex">
          <vs-input
              placeholder="Search (Country Code e.g. US)"
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
          <h3>Latest Traffic Entries</h3>
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
        <vs-th>Browser</vs-th>
        <vs-th>URL</vs-th>
        <vs-th>Country</vs-th>
        <vs-th>OS</vs-th>
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
          <vs-td :data="item.browser">
            <div>{{ item.browser }}</div>
          </vs-td>
          <vs-td :data="item.url">
            <div>{{ item.url }}</div>
            <small>{{ item.domain }}</small>
          </vs-td>
          <vs-td :data="item.country">
            <div>{{ item.country }}</div>
          </vs-td>
          <vs-td :data="item.os">
            <div>{{ item.os }}</div>
            <small class="tw-ml-1 tw-italic">~ {{ item.os_version }}</small>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
  import { analyticsMixin } from "@/libs/analytics/analyticsMixin";

  export default {
    name: "Analytics-TrafficList",
    title: "Analytics - Traffic List",

    mixins: [
      analyticsMixin,
    ],

    data() {
      return {
        decoratorKey: 'traffic',
        pageSize: 20,
      }
    },
  }
</script>

<style scoped>

</style>