<template lang="pug">
  .gran-logo(:style="{ backgroundImage: logoPath() }" :class="min ? 'min-logo' : ''")
</template>
<script>
export default {
  name: 'GranLogo',
  props: {
    allowColor: Boolean,
    min: Boolean
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
  width 180px
.min-logo
  @media screen and (max-width: 600px)
    width 32px
    background-size cover
    background-position left
</style>
