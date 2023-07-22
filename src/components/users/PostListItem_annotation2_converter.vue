<script setup lang="ts">
// 얘는 자식
import { computed, ref } from 'vue'
// defineProps과 defineEmits를 예전에는? 받아서 써왔으나 지금은 local에 선언 되어있는듯
import {
  // DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore'

import { Post, deletePost, updatedPost } from 'src/models/Post'

const emit = defineEmits<{(e: 'refresh'): void}>()

const props = defineProps<{
  item:QueryDocumentSnapshot<Post>
}>()
const post = computed(() => props.item.data())
// computed는 읽기만 하는거지 양방향(?) 소통이 되는 애는 아니다.

const content = ref(post.value.content)
async function update () {
  await updatedPost(props.item.id, content.value)
  emit('refresh')
  // 전달은 했지만 아직 부모가 듣진 않았음
}

async function remove () {
  await deletePost(props.item.id)
  emit('refresh')
  // 전달은 했지만 아직 부모가 듣진 않았음
}

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
      <q-item-label caption>
        {{ post.createdAt }}
      </q-item-label>
      <q-item-label caption>
        {{ post.updatedAt }}
      </q-item-label>
    </q-item-section>

    <q-item-section>
      <q-input v-model="content" />
      <!-- ref로 만든 값을 표현해야 양방향 수정?이 가능하기 떄문에 -->
    </q-item-section>

    <q-item-section side>
      <q-btn label="update" @click="update" />
    </q-item-section>
    <q-item-section side>
      <q-btn label="remove" @click="remove" />
    </q-item-section>
  </q-item>
</template>
