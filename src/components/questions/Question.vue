<template lang="pug">
  q-card.q-ma-md(:bordered="$q.dark.isActive" :class="tried ? isCorrect ? $q.dark.isActive ? null : 'bg-green-1' : $q.dark.isActive ? null : 'bg-red-1' : null ")
    q-card-section.no-padding
      q-item.q-pa-md(v-if="$q.platform.is.desktop")
        q-item-section(side) # {{index}}
        q-item-section(avatar v-for="(detail, dt) in question.details" :key="dt")
          q-item.no-padding
            q-separator(vertical)
            q-item-section.q-ml-md
              q-item-label(caption) {{detail.label}}
              q-item-label {{detail.value}}
        q-item-section
        q-item-section(side)
          q-item.no-padding
            q-item-section(side)
              q-btn(flat round dense icon="question_answer" color="primary")
                q-tooltip(transition-show="scale" transition-hide="scale" content-class="bg-primary text-subtitle2") Comentários
            q-item-section(side)
              q-btn(flat round dense icon="note" color="yellow-8")
                q-tooltip(transition-show="scale" transition-hide="scale" content-class="bg-yellow-8 text-black text-subtitle2") Anotações
            q-item-section(side)
              q-btn(flat round dense icon="equalizer" color="info")
                q-tooltip(transition-show="scale" transition-hide="scale" content-class="bg-info text-black text-subtitle2") Estatísticas
            q-item-section(side)
              q-btn(flat round dense icon="error_outline" color="negative")
                q-tooltip(transition-show="scale" transition-hide="scale" content-class="bg-negative text-subtitle2") Reportar Erro
      q-item(v-else)
        q-item-section(side) # {{index}}
        q-item-section
          q-item-label {{filter(question.details, dt => dt.slug === 'area')[0].value}} - {{filter(question.details, dt => dt.slug === 'year')[0].value}}
        q-imte-section(side)
          q-btn(flat round dense icon="question_answer" color="primary")
            q-tooltip(transition-show="scale" transition-hide="scale" content-class="bg-primary text-subtitle2") Comentários
        q-item-section(side)
          q-btn(icon="more_vert" flat round dense)
            q-menu
              q-item
                q-item-section
                  q-btn(flat round dense icon="note" color="yellow-8")
                    q-tooltip(transition-show="scale" transition-hide="scale" content-class="bg-yellow-8 text-black text-subtitle2") Anotações
                q-item-section
                  q-btn(flat round dense icon="equalizer" color="info")
                    q-tooltip(transition-show="scale" transition-hide="scale" content-class="bg-info text-black text-subtitle2") Estatísticas
                q-item-section
                  q-btn(flat round dense icon="error_outline" color="negative")
                    q-tooltip(transition-show="scale" transition-hide="scale" content-class="bg-negative text-subtitle2") Reportar Erro
              q-separator
              q-list(separator)
                q-item(v-for="(detail, dt) in question.details" :key="dt")
                  q-item-section
                    q-item-label(caption) {{detail.label}}
                    q-item-label {{detail.value}}
    q-separator
    q-card-section {{question.description}}
    q-card-section(v-if="question.options").no-padding
      q-list.q-gutter-sm
        q-item(
          v-for="(opt, op) in question.options" :key="op"
          :clickable="!tried"
          @click="tried ? null : question.answer = question.answer === opt.label ? null : opt.label"
          :class="getOptionClass(opt)")
          q-item-section.text-uppercase(avatar style="min-width: 24px") {{opt.label || op + 1}}.
          q-item-section {{opt.description}}
    q-card-section(align="left" v-if="showAnswer && question.answer && !tried")
      q-btn(label="verificar" color="primary" :loading="loadingCheck" @click="checkQuestion()")
</template>
<script>
import { filter } from 'lodash'
export default {
  name: 'Question',
  components: {
  },
  props: {
    question: Object,
    index: Number,
    showAnswer: Boolean
  },
  data () {
    return {
      loadingCheck: false,
      isCorrect: null,
      tried: false
    }
  },
  methods: {
    filter,
    getOptionClass (option) {
      const classes = ['']
      if (this.tried) { // User has tried
        if (option.label === this.question.correctAnswer) {
          classes.push('bg-green-6 text-white')
        } else if (option.label === this.question.answer) {
          classes.push('bg-red-6 text-white')
        }
      } else { // user has no tried
        if (this.question.answer === option.label) {
          classes.push('bg-primary text-white')
        }
      }
      return classes.join(' ')
    },
    checkQuestion () {
      this.loadingCheck = true
      setTimeout(() => {
        this.isCorrect = this.question.answer === this.question.correctAnswer
        if (this.isCorrect) {
          this.$q.notify({
            position: 'top',
            color: 'positive',
            message: 'Parabéns, você acertou!',
            icon: 'insert_emoticon'
          })
        } else {
          this.$q.notify({
            position: 'top',
            color: 'negative',
            message: 'Que pena, você errou!',
            icon: 'sentiment_dissatisfied'
          })
        }
        this.tried = true
        this.loadingCheck = false
      }, 1000)
    }
  }
}
</script>
<style lang="stylus" scoped>
.animated
  transition all 300ms ease
</style>
