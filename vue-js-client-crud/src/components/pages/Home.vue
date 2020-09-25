<template>
  <div>
    <vs-card>
      <template #header>
        <h3>Welcome Home, Genius.</h3>
      </template>

      <p><a href="https://acelords.space">AceLords</a> wishes you a happy development time while using this setup</p>
      <p>Feel free to ask any questions by following the URL</p>
    </vs-card>

    <States/>

    <vs-row vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-lg="8" vs-sm="6" vs-xs="12" code-toggler>
        <vs-card class="cardx">
          <div slot="header">
            <h4>
              Sales Summary
            </h4>
          </div>
          <div>
            <SalesSummary/>
          </div>

        </vs-card>
      </vs-col>
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-sm="6" vs-lg="4" vs-xs="12">
        <vs-card class="cardx">
          <div slot="header">
            <h4>
              Sales Income
            </h4>
          </div>
          <div>
            <SalesIncome/>
          </div>
        </vs-card>
      </vs-col>

      <vs-col vs-lg="12">
        <vs-card>
          <div slot="header">
            <h4>Top Selling Products</h4>
          </div>
          <TopProducts/>
        </vs-card>
      </vs-col>
    </vs-row>

    <Blogs/>

  </div>
</template>

<script>
  import SalesSummary from "@/components/dashboard/SalesSummary";
  import SalesIncome from "@/components/dashboard/SalesIncome";
  import TopProducts from "@/components/dashboard/TopProducts";
  import States from "@/components/dashboard/States";
  import Blogs from "@/components/dashboard/Blogs";

  export default {
    name: 'Home',
    title: 'Home',

    components: {
      SalesSummary,
      SalesIncome,
      TopProducts,
      States,
      Blogs
    }
  }
</script>

<style>

</style>