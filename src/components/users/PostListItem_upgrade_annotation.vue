<script setup lang="ts">
// 얘는 자식
import { computed, ref } from 'vue'
// defineProps과 defineEmits를 예전에는? 받아서 써왔으나 지금은 local에 선언 되어있는듯
import {
  // DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore'

import { Post } from 'src/models/Post'
import { firebaseUser } from 'src/composables/useAuth'

const emit = defineEmits<{(e: 'refresh'): void}>()

const props = defineProps<{
  item:QueryDocumentSnapshot<Post>
}>()
const post = computed(() => props.item.data())
const user = computed(() => post.value.userSnapshot?.data())
// computed는 읽기만 하는거지 양방향(?) 소통이 되는 애는 아니다.

const content = ref(post.value.content)
async function update () {
  await post.value.updatedPost(props.item.id, content.value)
  emit('refresh')
  // buttonOn.value = true
  isEditing.value = false
  // 전달은 했지만 아직 부모가 듣진 않았음
}

async function remove () {
  await post.value.deletePost(props.item.id)
  emit('refresh')
  // 전달은 했지만 아직 부모가 듣진 않았음
}

// console.log('paaaaaaa-----', user.value?.email)

// console.log('props.item.id', props.item.id)
// console.log('ttttt', loginEmail.value) // 로그인

const isEditing = ref(false)

const methods2 = () => {
  isEditing.value = true
  // console.log('--aa', isStatusOn)
}

const compare = computed(() => {
  console.log('k')
  if (user.value?.email !== firebaseUser.value?.email) {
    console.log('eeeeeeeeeeeeeeeeeee')
    return false
  } else {
    return true
  }
})

</script>

<template>
  <q-item>
    <q-item avatar>
      {{ item.id }}
      <!-- {{ firebaseUser.email }} -->
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
      <q-item-label caption>
        {{ post.userRef.id}}
      </q-item-label>
      <q-item-label caption>
        {{ user?.email}}
      </q-item-label>
    </q-item-section>
    <q-item v-if="compare && !isEditing">
      <q-btn outline color="primary" label="수정하기" @click="methods2"/>
    </q-item>
    <q-item v-if="isEditing">
      <q-input v-model="content" />
      <q-btn label="update" @click="update" />
      <q-btn label="remove" @click="remove" />
    </q-item>
  </q-item>
</template>
