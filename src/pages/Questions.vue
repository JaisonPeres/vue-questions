<template lang="pug">
  q-page.relative-position
    q-scroll-area.scroll-page
      .q-pa-lg
        q-card
          q-card-section
            .row
              .col-md-12.col-xs-12
                q-input.q-ma-sm(filled label="Disciplinas e Assuntos")
              .col-md-2.col-xs-12
                q-select.q-ma-sm(filled label="Banca" :options="options" v-model="option")
              .col-md-2.col-xs-12
                q-select.q-ma-sm(filled label="Órgão" :options="options" v-model="option")
              .col-md-2.col-xs-12
                q-select.q-ma-sm(filled label="Ano" :options="options" v-model="option")
              .col-md-2.col-xs-12
                q-select.q-ma-sm(filled label="Cargo" :options="options" v-model="option")
              .col-md-2.col-xs-12
                q-select.q-ma-sm(filled label="Nível" :options="options" v-model="option")
              .col-md-2.col-xs-12
                q-select.q-ma-sm(filled label="Tipo de questão" :options="options" v-model="option")
    q-inner-loading(:showing="loading")
      q-spinner(size="50px" color="primary" :thickness="2")
</template>

<script>
export default {
  name: 'PageQuestions',
  data () {
    return {
      loading: false,
      option: null,
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
  }
}
</script>
<style lang="stylus" scoped>
.scroll-page
  width 100%
  height calc(100vh - 50px)
</style>
