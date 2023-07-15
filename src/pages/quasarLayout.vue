<template>
  <div>
    <div class="row">
      <!-- row column 으로 사용 가능 -->
      <!-- <div>First Column</div>
      <div>Second Column</div>
      <div>Thrid Column</div> -->
      <div class="col-3">
        1
      </div>
      <div class="col-6">
        2
      </div>
      <div class="col-3">
        1
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        col
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        col
      </div>
      <div class="col-xs-12 col-sm-6 col-md-4">
        col
      </div>
      <!-- 이게 언제 필요하냐면 -->
      <!-- 이게 dom화면에 따라 비율이 바뀌어서 바꿔보면서 확인하면 됨. -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'file_name',
  data () {
    return {
      //
    }
  },
  setup () {
    // blah-blah
  }
})
</script>
