<template lang="pug">
  q-page.flex.flex-center.relative-position
    .row
      .col-8
        q-scroll-area.scroll-page
      .col-4
        q-scroll-area.scroll-page
          .bg-white
            .text-h1 filtro
    q-inner-loading(:showing="loading")
      q-spinner(size="50px" color="primary" :thickness="2")
</template>

<script>
export default {
  name: 'PageQuestions',
  data () {
    return {
      loading: false
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus" scoped>
.scroll-page
  width 100%
  height calc(100vh - 50px)
</style>
