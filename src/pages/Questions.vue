<template lang="pug">
  q-page.relative-position
    q-scroll-area.scroll-page(@scroll="fireScroll" ref="scrollPage")
      .top(ref="questionTop")
      .q-pa-md
        question(
          v-for="(question, qs) in questions"
          :key="qs" :index="qs + 1"
          show-answer
          :question="question")
      .q-pa-lg
      q-page-sticky(position="bottom-left" :offset="[18, 18]")
        transition(appear
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutDown")
          q-btn(color="grey-8" @click="toTop()" v-if="toTopShow" round icon="keyboard_arrow_up")
    filter-questions(v-model="filter" :count="questions.length")
    q-inner-loading(:showing="loading" :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'")
      q-spinner(size="50px" color="primary" :thickness="2")
</template>

<script>
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll
import FilterQuestions from '../components/questions/FilterQuestions'
import Question from '../components/questions/Question'
import questions from '../data/questions'
export default {
  name: 'PageQuestions',
  components: {
    FilterQuestions,
    Question
  },
  data () {
    return {
      loading: true,
      filter: false,
      questions: questions(),
      toTopShow: false
    }
  },
  created () {
    setTimeout(() => {
      this.filter = true
    }, 200)
    setTimeout(() => {
      this.loading = false
    }, 1600)
  },
  methods: {
    fireScroll ({ verticalPercentage }) {
      this.toTopShow = verticalPercentage > 0.1
    },
    toTop () {
      const ele = this.$refs.questionTop
      const target = getScrollTarget(ele)
      const offset = 0
      const duration = this.$refs.scrollPage.getScrollPosition() / 4
      setScrollPosition(target, offset, duration)
    },
    registerAnswer (question, opt) {
      this.$q.notify('Você respondeu à questão: ' + question.code + ' a resposta: ' + opt.label)
    }
  }
}
</script>
<style lang="stylus" scoped>
.scroll-page
  width 100%
  height calc(100vh - 50px)
</style>
