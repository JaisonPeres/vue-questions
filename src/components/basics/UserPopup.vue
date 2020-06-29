<template lang="pug">
q-btn(flat round icon="person")
  q-menu
    q-card.user-popup-card
      q-card-section
        q-item.no-padding
          q-item-section(avatar)
            q-avatar(size="60px").shadow-3
              img(src="https://thispersondoesnotexist.com/image")
          q-item-section
            q-item-label Stuart
            q-item-label(caption) stuart@email.com
      q-card-section.no-padding
        q-item.no-padding(style="min-height: 20px")
          q-item-section.no-margin
            q-btn.full-width(flat label="Perfil")
          q-item-section.no-margin
            q-btn.full-width(flat color="red-8" label="Sair")
</template>
<script>
export default {
  name: 'UserPopup'
}
</script>
<style lang="stylus" scoped>
.user-popup-card
  width 280px
</style>
