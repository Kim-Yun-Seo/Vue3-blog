<script setup lang="ts">
import { ref } from 'vue'

const justify = ref('justify-start')
const justifys = [
  'start',
  'center',
  'end',
  'around',
  'between',
  'evenly'
].map(v => 'justify-' + v)

const item = ref('items-start')
const items = ['items-start', 'itmes-center', 'items-end']
</script>

<template>
  <q-card>
    <q-toolbar>
      <q-toolbar-title>row</q-toolbar-title>
      <q-select
        v-model="justify"
        :options="justifys"
        />
        <q-select
        v-model="item"
        :options="items"
        />
    </q-toolbar>
    <q-card-section>
      {{ justify }}, {{ justifys }}
      {{ item }}, {{ items }}
    </q-card-section>
    <div class="row" :class="justify">

      <!-- <div v-for="i in 7" : key="i">
        <q-avatar size="100px" font-size="52px" color="teal"
        text-color ="white" icon="directions"/>
      </div> -->
    </div>
  </q-card>
</template>
