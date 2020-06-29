<template lang="pug">
  q-item
    q-item-section(side v-for="(detail, dt) in details" :key="dt")
      q-btn(flat round dense :icon="detail.icon" color="grey-6")
        q-tooltip(transition-show="scale" transition-hide="scale" content-class="text-subtitle2") {{detail.label}}
</template>
<script>
export default {
  name: 'QuestionDetails',
  data () {
    return {
      details: [
        {
          icon: 'question_answer',
          label: 'Comentários'
        },
        {
          icon: 'note',
          label: 'Anotações'
        },
        {
          icon: 'equalizer',
          label: 'Estatísticas'
        },
        {
          icon: 'error_outline',
          label: 'Reportar Erro'
        }
      ]
    }
  }
}
</script>
