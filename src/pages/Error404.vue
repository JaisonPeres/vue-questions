<template lang="pug">
  .fixed-center.text-center
    p
      img.sad(v-if="$q.dark.isActive" src="~assets/sad-white.svg")
      img.sad(v-else src="~assets/sad.svg")
    .text-h6.text-faded Ops, nada por aqui...
    q-btn.q-mt-lg(color="orange"
      style="width:200px;"
      to="/"
      label="Voltar")
</template>

<script >
export default {
  name: 'Error404'
}
</script>
<style lang="stylus" scoped>
.sad
  width 30vw
  height 150px
</style>
