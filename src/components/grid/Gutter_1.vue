<script setup lang="ts">
import { ref } from 'vue'

const gutter = ref('q-gutter-sm')
const gutters = ['xs', 'sm', 'md', 'lg', 'xl'].map(v => 'q-gutter-' + v)
</script>

<template>
  <div style="color: blue;">

  </div>
  <q-card>
    <q-toolbar>
      <q-toolbar-title>gutter</q-toolbar-title>
      <q-select v-model="gutter" :options ="gutters"></q-select>
    </q-toolbar>
    <q-card-section>
      {{ gutter }} {{ gutters }}
    </q-card-section>
    <div class="gutter">
      <q-btn color="brown" label="Button" v-for="n in 7" :key="`xs-${n}`" />
    </div>
    <q-card-actions>
      <q-space/>
      <q-btn class="aaa" :class="`${'kkk'}`" label="Button" v-for="n in 7" :key="`xs-${n}`" />
      <!-- 현재 카드에 가장 맞는 사이즈와 간격 마진으로 만드는 좋은  -->
    </q-card-actions>
  </q-card>
</template>

<style>
.aaa {
  color: blue;
}
.kkk {
  /* margin: 100px; */
}
</style>
