<script setup lang="ts">
// 얘는 자식
import { computed, onMounted } from 'vue'
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
//  QueryDocumentSnapshot은 너의 firestore database(요청의 일환으로서) 안에 있는 document를 읽어서 포함하고 있는 것.
//  그 문서는 존재가 보장되고 해당 데이터는 .data() 또는 .get(<field>)으로 추출하여 특정 필드를 가져올 수 있습니다.
// defineProps, collection, query, getDocs

const props = defineProps<{
  item:QueryDocumentSnapshot<DocumentData>,
  id: string
  // 부모로 부터 받은 자산을 표현해주는 것.
}>()
// property = 이함수가 사용되는 데 필요한 인자들?
onMounted(() => {
  console.log('888888', props.id)
})

console.log('------', props.item.data())
// {title: '', content: ''}라고 저장되어있는 것을 computed 해서 post로 만듬.
const post = computed(() => props.item.data())

// 유추하기론 computed()가 계산수행형 함수라서.. 대입되는 값이 바뀌면 다시 랜더링 한다는 뜻이 아닐까 추측
// 계속 지켜보다가 computed는 함수기 때문에 무조건 return 값이 있는데
// 뭔가가 바뀌면 계속 밑에서 쓰는 애들 계속 랜더링 해서 바꿔야지. = props.item.data()값이 바뀌면
// 바꿔서 다시 대입.

// const item = {
//   dfsdf: {title: 'dfsdf', content: 'sdfdsfsdf'}
// }

console.log(post)
// post의 .value안에 {title: '', content: ''}가 저장되어있음

</script>

<template>
  <q-item>
    <q-item avatar>
      {{ item.id }}
    </q-item>
    <q-item-section>
      <q-item-label>
        {{ post.title }}
      </q-item-label>
      <q-item-label caption>
        {{ post.content }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
