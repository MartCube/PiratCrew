<script setup>
const { t } = useI18n()

import logo from '/logo.png'

const partnersLogos = [
  logo,
  logo,
  logo,
  logo,
  logo,
  logo,
  logo,


]
</script>

<template>
  <section id="partners">

    <TextBox :text="t('partners')" />

    <div class="partners-wrapper">
      <div class="partners-wrapper-inner">
        <div v-for="(logo, index) in partnersLogos" :key="index" class="partner-block">
          <img :src="logo" alt="Partner Logo" />
        </div>
      </div>
    </div>


  </section>
</template>

<style lang="scss" scoped>
.partners-wrapper {
  width: 100%;
  overflow-x: auto;
  padding: 20px 0;
}
.partners-wrapper-inner {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  .partner-block {
    border: 1px solid white;
    padding: 12px;
    img {
      width: 100px;
      height: auto;
      object-fit: contain;
    }
  }
  @media (min-width: 1240px) {
    justify-content: center;
  }
}
</style>