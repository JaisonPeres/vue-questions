<template lang="pug">
.filter-questions
  q-page-sticky(position="bottom-right" :offset="[18, 18]")
    q-btn(color="primary" @click="filterDialog = !filterDialog" fab)
      q-icon.animated(:name="filterDialog ? 'close' : 'filter_list'" :class="filterDialog ? 'rotate-90' : null")
      q-badge.dot-badge(floating color="blue-5" v-if="count > 0")
        .text-center.full-width {{count <= 9 ? count : '+9'}}
  q-dialog(
    content-class="filter-dialog"
    no-esc-dismiss no-backdrop-dismiss
    v-model="filterDialog"
    @hide.passive="openDialog(false)"
    :seamless="!$q.platform.is.mobile && seamlessFilter"
    :position="$q.platform.is.mobile ? undefined : 'right'"
    :offset="[18, 18]")
    q-card.filter-card(:bordered="$q.dark.isActive")
      q-card-section.no-padding
        q-item
          q-item-section
            .text-subtitle1(v-if="count > 0") {{count > 1 ? count + ' Questões encontradas' : '1 Questão encontrada'}}
            .text-subtitle1(v-else) Nenhuma Questão encontrada
          q-item-section(side)
            q-btn(flat round icon="save")
              q-badge(floating v-if="saveFilters.length") {{saveFilters.length}}
              q-menu
                q-item.no-padding
                  q-item-section
                    q-input(v-model="newFilterName" label="Salvar filtro" filled)
                      template(v-slot:append)
                        q-btn(icon="add" @click="newFilterName ? saveFilter() : null" flat round)
                q-item(v-if="saveFilters.length")
                  q-item-section
                    q-item-label(caption) Filtros salvos
                q-list(separator v-if="saveFilters.length")
                  q-item(v-for="(saveFilter, sf) in saveFilters" :key="sf")
                    q-item-section {{saveFilter.label}}
                    q-item-section(side)
                      q-btn(@click="openLocalFilter(saveFilter.filter)" icon="check" flat round dense)
                    q-item-section(side)
                      q-btn(@click="removeLocalFilter(sf)" icon="delete_outline" flat round dense)
              q-tooltip
                .text-subtitle2 Salvar Filtro
          q-item-section(side)
            q-btn(flat round icon="question_answer")
              q-menu
                q-list(separator)
                  q-item
                    q-item-section
                      .text-subtitle1 Exibir Comentários
                  q-item(v-for="(setting, st) in settings.comments" :key="st")
                    q-item-section
                      q-toggle(:label="setting.label" v-model="setting.value")
          q-item-section(side)
            q-btn(flat round icon="playlist_add_check")
              q-menu
                q-list(separator)
                  q-item
                    q-item-section
                      .text-subtitle1 Exibir Questões
                  q-item(v-for="(setting, st) in settings.questions" :key="st")
                    q-item-section
                      q-toggle(:label="setting.label" v-model="setting.value")
          q-item-section(side)
            q-btn(icon="more_vert" dense flat round)
              q-menu
                q-list
                  q-item(v-if="$q.platform.is.desktop")
                    q-item-section
                      q-toggle(label="Filtrar e ver resultado" v-model="seamlessFilter" icon="bolt" color="orange")
                        q-tooltip(:delay="600")
                          .text-subtitle2 Se ligado, exibe e permite que você resolva questões com o filtro aberto
                  q-item
                    q-item-section
                      q-toggle(label="Iniciar com filtro" v-model="showFilter" icon="add" color="primary")
                        q-tooltip(:delay="600")
                          .text-subtitle2 Se ligado, faz com que a página de questões sempre inicie com o filtro aberto
      q-separator
      q-card-section.no-padding
        q-scroll-area.filter-scroll
          .q-pa-md
            .row
              .col(v-for="(field, fd) in filter" :key="fd" :class="'col-xs-12 ' + 'col-md-' + field.size")
                q-select.q-ma-sm(
                  v-if="field.options"
                  :label="field.label"
                  v-model="field.value"
                  :options="field.options"
                  option-value="value"
                  option-label="label"
                  map-options
                  emit-value
                  filled)
                q-input.q-ma-sm(
                  v-else
                  :label="field.label"
                  v-model="field.value"
                  filled)
      q-separator
      q-card-section.no-padding
        q-item
          q-item-section
          q-item-section(side)
            q-btn(flat @click="filterDialog = false" label="cancelar" color="grey")
          q-item-section(side)
            q-btn(unelevated @click="filterDialog = false" label="filtrar" color="primary")
</template>
<script>
// import { filter } from 'lodash'
import filterData from '../../data/filter'
export default {
  name: 'FilterQuestions',
  props: {
    count: Number
  },
  data () {
    return {
      open: false,
      option: null,
      allquestions: false,
      filterDialog: true,
      showFilter: true,
      seamlessFilter: this.$q.localStorage.getItem('seamless_filter') || false,
      newFilterName: null,
      saveFilters: [],
      filter: [],
      settings: {
        questions: [
          {
            label: 'Anuladas',
            slug: 'anuladas',
            value: true
          },
          {
            label: 'Desatualizadas',
            slug: 'desatualizadas',
            value: true
          }
        ],
        comments: [
          {
            label: 'Professores',
            slug: 'teacher-comments',
            value: true
          },
          {
            label: 'Outros Alunos',
            slug: 'student-comments',
            value: true
          },
          {
            label: 'Meus',
            slug: 'my-comments',
            value: true
          }
        ]
      }
    }
  },
  watch: {
    seamlessFilter () {
      this.$q.localStorage.set('seamless_filter', this.seamlessFilter)
    },
    showFilter () {
      this.$q.localStorage.set('show_filter', this.showFilter)
    }
  },
  created () {
    this.showFilter = this.$q.localStorage.getItem('show_filter')
    this.showFilter = this.showFilter === null ? true : this.showFilter
    this.filterDialog = this.showFilter
    this.filter = filterData()
    this.loadLocalFilter()
  },
  methods: {
    parseLocalStorage (str) {
      return JSON.parse(JSON.stringify(str))
    },
    loadLocalFilter () {
      let localFilter = this.$q.localStorage.getItem('filter') || []
      localFilter = this.parseLocalStorage(localFilter)
      this.saveFilters = localFilter
    },
    openLocalFilter (localFilterData) {
      // this.filter = this.filter.map((item) => {
      //   const matchItem = filter(localFilterData, (localItem) => {
      //     if (localItem.slug === item.field) {
      //       return {
      //         ...item,
      //         value: localItem.value || null
      //       }
      //     } else {
      //       return item
      //     }
      //   })[0]
      //   console.log(matchItem.value)
      //   return matchItem
      // })
    },
    openDialog (status = true) {
      this.$emit('input', status)
    },
    removeLocalFilter (index) {
      let localFilter = this.$q.localStorage.getItem('filter')
      localFilter = this.parseLocalStorage(localFilter)
      if (localFilter && localFilter.length) {
        if (localFilter.length > 1) {
          localFilter.splice(index, 1)
        } else {
          localFilter = []
        }
        this.$q.localStorage.set('filter', localFilter)
      }
      this.loadLocalFilter()
    },
    saveFilter () {
      const filter = this.filter.map((item) => {
        return {
          slug: item.field,
          value: item.value
        }
      })
      let localFilter = this.$q.localStorage.getItem('filter') || []
      localFilter = this.parseLocalStorage(localFilter)
      localFilter.push({
        label: this.newFilterName,
        filter: filter
      })
      this.$q.localStorage.set('filter', localFilter)
      this.loadLocalFilter()
      this.newFilterName = null
    }
  }
}
</script>
<style lang="stylus" scoped>
.dot-badge
  width 24px
  height 24px
  border-radius 24px
  text-align center
.filter-card
  width 800px
.filter-scroll
  width 100%
  height 320px
  @media screen and (max-width: 600px)
    height 60vh
.animated
  transition all 300ms ease
</style>
