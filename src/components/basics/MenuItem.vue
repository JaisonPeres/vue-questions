<template lang="pug">
  q-item(clickable :to="link" exact)
    q-item-section(v-if="icon" avatar)
      q-icon(:name="icon")
    q-item-section
      q-item-label {{ title }}
    q-tooltip(
      v-if="mini"
      anchor="center right"
      self="center left"
      :offset="[10, 10]"
      :delay="600"
      :content-class="[ 'bg-blue-grey', 'q-px-sm', 'q-py-xs', 'text-subtitle2', 'shadow-1']") {{title}}
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      default: '#'
    },
    icon: {
      type: String,
      default: ''
    },
    mini: {
      type: Boolean,
      default: false
    }
  }
}
</script>
