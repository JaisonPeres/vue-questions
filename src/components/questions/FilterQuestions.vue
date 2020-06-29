<template lang="pug">
.filter-questions
  q-page-sticky(position="bottom-right" :offset="[18, 18]")
    q-btn(color="primary" @click="openDialog(!value)" fab)
      q-icon.animated(:name="value ? 'close' : 'filter_list'" :class="value ? 'rotate-90' : null")
      q-badge.dot-badge(floating color="blue-5" v-if="count > 0")
        .text-center.full-width {{count <= 9 ? count : '+9'}}
  q-dialog(
    content-class="filter-dialog"
    no-esc-dismiss no-backdrop-dismiss
    v-model="value"
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
      q-separator
      q-card-section.no-padding
        q-scroll-area.filter-scroll
          .q-pa-md
            .row
              .col-md-12.col-xs-12
                q-input.q-ma-sm(filled label="Disciplinas e Assuntos")
              .col-md-6.col-xs-12
                q-select.q-ma-sm(filled label="Banca" :options="options" v-model="option")
              .col-md-6.col-xs-12
                q-select.q-ma-sm(filled label="Órgão" :options="options" v-model="option")
              .col-md-6.col-xs-12
                q-select.q-ma-sm(filled label="Ano" :options="options" v-model="option")
              .col-md-6.col-xs-12
                q-select.q-ma-sm(filled label="Cargo" :options="options" v-model="option")
              .col-md-6.col-xs-12
                q-select.q-ma-sm(filled label="Nível" :options="options" v-model="option")
              .col-md-6.col-xs-12
                q-select.q-ma-sm(filled label="Tipo de questão" :options="options" v-model="option")
      q-separator
      q-card-section.no-padding
        q-item
          q-item-section(side)
            q-toggle(label="Filtrar e Resolver" left-label v-model="seamlessFilter" icon="bolt" color="orange")
          q-item-section
          q-item-section(side)
            q-btn(flat @click="openDialog(false)" label="cancelar" color="grey")
          q-item-section(side)
            q-btn(unelevated @click="openDialog(false)" label="filtrar" color="primary")
</template>
<script>
export default {
  name: 'FilterQuestions',
  props: {
    value: Boolean,
    count: Number
  },
  data () {
    return {
      open: false,
      option: null,
      allquestions: false,
      seamlessFilter: true,
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
      },
      options: [
        {
          label: 'opt 1',
          value: 'opt 1'
        },
        {
          label: 'opt 2',
          value: 'opt 2'
        },
        {
          label: 'opt 3',
          value: 'opt 3'
        },
        {
          label: 'opt 4',
          value: 'opt 4'
        }
      ]
    }
  },
  methods: {
    openDialog (status = true) {
      this.$emit('input', status)
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
