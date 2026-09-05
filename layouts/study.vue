<template>
  <!--
    Study layout: no app sidebar, no footer, no page padding.
    The page owns the full viewport and splits it into
    topbar / rail / stage / dock (desktop) or topbar / stage / tray (mobile).
  -->
  <div class="study-root h-[100dvh] w-full overflow-hidden bg-base">
    <NuxtLoadingIndicator :height="2" color="#e5ad31" :throttle="150" />
    <slot />
    <UNotifications />
  </div>
</template>

<style scoped>
.study-root {
  /* Stage typography is tuned for long reading: no theme textures under it. */
  background-image: none;
}
</style>
