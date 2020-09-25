<template>
    <div class="tw-flex tw-justify-center tw-items-center">
      <vs-card class="tw-max-w-3xl tw-text-center">
        <div slot="header">
          <h3>Page Not Found!</h3>
        </div>

        <img src="@/assets/images/404-error.png" class="img-fluid" alt="Page Not Found!" style="max-height: 120px;">

        <p>Sorry, but the page you are looking for could not be found!</p>
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