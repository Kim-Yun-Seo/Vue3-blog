<template>
  <div>
    <!--  -->
    slot out
    <slot />
    <!-- slot안에 TestVue 에서 쓴게 들어감 -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'file_name',

  data () {
    //
  },
  setup () {
    // blah-blah
  }
})
</script>
