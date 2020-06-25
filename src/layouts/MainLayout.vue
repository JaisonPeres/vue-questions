<template lang="pug">
  q-layout(view="hHh lpR fFf" ref="layoutApp")
    q-header(elevated)
      q-toolbar(:class="$q.dark.isActive ? 'bg-blue-grey-10' : 'bg-blue-grey-8'")
        q-btn(flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen")
        q-toolbar-title.q-pa-sm
          q-item.title-item
            q-item-section(side)
              gran-logo(min)
            q-item-section {{$route.meta.title}}
        user-popup
    menu-drawer(
      :menu="menu"
      :open="leftDrawerOpen"
      @show="leftDrawerOpen = true"
      @hide="leftDrawerOpen = false")
    q-page-container(:class="!$q.dark.isActive ? 'bg-grey-3': null")
      router-view
</template>

<script>
import GranLogo from 'components/basics/GranLogo'
import MenuDrawer from 'components/basics/MenuDrawer'
import UserPopup from 'components/basics/UserPopup'
import { LocalStorage } from 'quasar'
export default {
  name: 'MainLayout',

  components: {
    LocalStorage,
    GranLogo,
    UserPopup,
    MenuDrawer
  },

  data () {
    return {
      leftDrawerOpen: true,
      menu: [
        {
          title: 'Provas',
          icon: 'done_all',
          link: '/provas'
        },
        {
          title: 'Questões para Concursos',
          icon: 'how_to_reg',
          link: '/questoes'
        },
        {
          title: 'Questões para OAB',
          icon: 'account_balance',
          link: '/oab'
        }
      ]
    }
  },
  meta () {
    return {
      title: this.$route.meta.title,
      titleTemplate: title => `${title} - Gran Cursos`,
      meta: {
        description: { name: 'description', content: this.$route.meta.description },
        keywords: { name: 'keywords', content: this.$route.meta.keywords },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
      },
      link: {
        material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
      },
      script: {
        ldJson: {
          type: 'application/ld+json',
          innerHTML: '{ "@context": "http://schema.org" }'
        }
      },
      noscript: {
        default: 'This is content for browsers with no JS (or disabled JS)'
      }
    }
  },
  watch: {
    '$q.dark.isActive' (val) {
      try {
        this.$q.localStorage.set('dark_mode', val)
      } catch (e) {
        console.log('Error: ', e)
      }
    },
    miniState () {
      try {
        this.$q.localStorage.set('mini_mode', this.miniState)
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
<style lang="stylus">
.gran-logo-toolbar
  @media screen and (max-width: 600px)
    display none
.title-item
  min-height unset
  padding 0
</style>
