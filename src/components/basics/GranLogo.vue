<template lang="pug">
  .gran-logo(:style="{ backgroundImage: logoPath() }")
</template>
<script>
export default {
  name: 'GranLogo',
  props: {
    allowColor: Boolean
  },
  data () {
    return {
      logoWhite: '../../statics/gran-logo.svg',
      logoColor: '../../statics/gran-logo-color.svg'
    }
  },
  methods: {
    logoPath () {
      return 'url(' + (!this.$q.dark.isActive && this.allowColor ? this.logoColor : this.logoWhite) + ')'
    }
  }
}
</script>
<style lang="stylus" scoped>
.gran-logo
  background-repeat no-repeat
  background-size contain
  background-position center
  height 32px
  width: 180px
</style>
