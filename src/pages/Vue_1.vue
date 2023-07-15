<template>
  <div>
    <q-page padding>
      <q-card>
        <q-card-section style="background-color: rgb(204, 191, 250);">
          text: {{ addedText }}
          <!-- html안에 변수가 들어가 있으니까 찾기 쉬워지고 addedText만 찾으면 -->
          <!-- 찾는 과정이 확 줄어들고 쉬워짐 -->
          <!-- 일일히 다 수정할 필요 없이 script에서 수정하게 되면 style이랑 화면이 다 바뀜 -->
          <!-- 그 상위의 것을 생각 할 필요 없어짐. -->
        </q-card-section>
        <q-card-section>
          <q-input v-model="text" />
        </q-card-section>
        <q-card-actions>
          <q-btn flat label = "add" @click="add" />
        </q-card-actions>
      </q-card>
    </q-page>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
// 필요한걸 계속 꺼내서 써야함
// this를 자꾸 얘기 하는 이유가 defineCompoent가 하나로 묶어서 this남발 하는 거였움...

export default defineComponent({
  name: 'file_name',
  data () {
    return {
      // text: 'abc'
    }
  },
  computed: {
    // addedText ():string {
    //   return this.text + ' added'
    // }
  },
  methods: { // key와 value
    // add () {
    //   this.text += ' add'
    // }
  },
  setup () { // 얘는 함수
    // 위에 애랑 같은 기능을 할 것
    // 얘는 실행하면 한번만 실행됨

    const text = ref('abc')
    const addedText = computed(() => text.value + ' added')
    // computed 계산이 끝난 비슷한 걸로 watched가 있음. 안에 있는 값이 변경 되면. 쟤를 바꿔
    // value를 안 쓰려면 reactive를 사용해야함
    // 지금 알면 재미..없다고... 함..
    const add = () => {
      text.value += ' add'
      // 이렇게 쓰면 위에 compostion(?) 방식 처럼 this를 안 써도 됨
    }
    return {
      text,
      addedText,
      add
    }
  }
})
</script>
