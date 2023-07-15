<template>
  <div id="counter">

    <TestCompo>
      fifififii
    </TestCompo>
    <!--  -->
    <p>{{ message }}</p>
    <button @click="reverseMessage">
      reverseMessage
    </button>
    <q-page padding>
      counter: {{ counter }}
      <q-card>
        <q-card-section> text: hssddiddi </q-card-section>
      </q-card>
    </q-page>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TestCompo from '../components/TestCompo.vue'
// component내의 타입을 올바르게 추론하기 위해
// definecomponent를 사용하고 component를 정의한다

export default defineComponent({
  name: 'TestVue.vue',
  components: { TestCompo },

  setup () {
    // blah-blah
  },
  data () {
    return {
      counter: 3,
      message: 'hello Vue.js'
    }
  },
  methods: {
    reverseMessage () {
      const a = this.message.split('')
      console.log(a)
      this.message = this.message.split('').reverse().join('')
    }
  }
})
</script>
