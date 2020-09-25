<template>
    <div class="tw-flex tw-justify-center tw-items-center">
      <vs-card class="tw-max-w-3xl tw-text-center">
        <div slot="header">
          <h3>Not Authorized!</h3>
        </div>

        <img src="@/assets/images/401.png" class="img-fluid" alt="Not Authorized!" style="max-height: 120px;">

        <p>Sorry, but you are not authorized to view this section!</p>
      </vs-card>

    </div>
</template>

<script>
    export default {
        name: 'PageNotFound',
        title: 'Page Not Found',
    }
</script>

<style>

</style>