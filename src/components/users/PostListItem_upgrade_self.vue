<script setup lang="ts">
// 얘는 자식
import { computed, ref } from 'vue'
// defineProps과 defineEmits를 예전에는? 받아서 써왔으나 지금은 local에 선언 되어있는듯
import {
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
const canEdit = computed(() => nowEmail.value === user.value?.email)

const content = ref(post.value.content)
const isEditNow = ref(false)
const nowEmail = ref(firebaseUser.value?.email)

async function update () {
  await post.value.updatedPost(props.item.id, content.value)
  emit('refresh')
  // 전달은 했지만 아직 부모가 듣진 않았음
  isEditNow.value = false
}

async function remove () {
  await post.value.deletePost(props.item.id)
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
      <q-item-label caption>
        {{ post.userRef.id}}
      </q-item-label>
      <q-item-label caption>
        {{ user?.email}}
      </q-item-label>
    </q-item-section>

    <q-item v-if="canEdit && !isEditNow">
      <q-btn outline color="primary" label="수정" @click="isEditNow = true"></q-btn>
    </q-item>

    <q-item v-if="isEditNow">
      <q-input v-model="content" />
      <q-btn label="update" @click="update" />
      <q-btn label="remove" @click="remove" />
    </q-item>
  </q-item>
</template>
