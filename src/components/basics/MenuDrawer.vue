<template lang="pug">
q-drawer(
  v-model="value"
  @hide="$emit('input', value)"
  show-if-above
  :mini="mini"
  bordered)
  q-scroll-area.scroll-menu
    q-list
      q-item.q-py-lg.gran-logo-drawer
        q-item-section.flex.flex-center
          gran-logo(allow-color)
      q-separator.gran-logo-drawer
      menu-item(
        v-for="link in menu"
        :mini="mini"
        :key="link.title"
        v-bind="link")
  q-separator
  q-list.no-padding.no-margin
    q-item(clickable @click="setDark()")
      q-item-section(avatar)
        q-icon(:name="$q.dark.isActive ? 'img:/../../statics/clone.svg' : 'img:/../../statics/darth.svg'" size="24px")
      q-item-section {{$q.dark.isActive ? 'Modo Claro' : 'Modo Escuro'}}
      q-tooltip(
        v-if="mini"
        anchor="center right"
        self="center left"
        :offset="[10, 10]"
        :delay="600"
        :content-class="[ 'bg-blue-grey', 'q-px-sm', 'q-py-xs', 'text-subtitle2', 'shadow-1']") {{$q.dark.isActive ? 'Modo CLaro' : 'Modo Escuro'}}
    q-item.toggle-mini(clickable @click="mini = !mini")
      q-item-section(avatar)
        q-icon.rotate-90(:name="!mini ? 'unfold_less' : 'unfold_more'")
      q-item-section {{!mini ? 'Diminuir menu' : null}}
      q-tooltip(
        v-if="mini"
        anchor="center right"
        self="center left"
        :offset="[10, 10]"
        :delay="600"
        :content-class="[ 'bg-blue-grey', 'q-px-sm', 'q-py-xs', 'text-subtitle2', 'shadow-1']") Aumentar menu
</template>
<script>
import GranLogo from './GranLogo'
import MenuItem from './MenuItem'
export default {
  name: 'MenuDrawer',
  components: {
    MenuItem,
    GranLogo
  },
  props: {
    menu: Array,
    value: Boolean
  },
  data () {
    return {
      mini: false
    }
  },
  created () {
    this.$q.dark.set(this.$q.localStorage.getItem('dark_mode'))
    this.mini = this.$q.localStorage.getItem('mini_mode')
  },
  watch: {
    mini () {
      try {
        this.$q.localStorage.set('mini_mode', this.mini)
      } catch (e) {
        console.log('Error: ', e)
      }
    }
  },
  methods: {
    setDark () {
      this.$q.dark.toggle()
    }
  }
}
</script>
<style lang="stylus" scoped>
.scroll-menu
  width 100%
  height calc(100vh - (97px + 50px))
  @media screen and (max-width: 600px)
    height calc(100vh - 49px)
.toggle-mini
  @media screen and (max-width: 600px)
    display none
.gran-logo-drawer
  @media screen and (min-width: 600px)
    display none
</style>
