<script setup lang="ts">

import { computed, ref } from 'vue'
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
const compare = computed(() => user.value?.email === firebaseUser.value?.email)

const content = ref(post.value.content)
const isEditing = ref(false)

async function update () {
  await post.value.updatedPost(props.item.id, content.value)
  emit('refresh')
  isEditing.value = false
}

async function remove () {
  await post.value.deletePost(props.item.id)
  emit('refresh')
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
    <q-item v-if="compare && !isEditing">
      <q-btn outline color="primary" label="수정하기" @click="isEditing = true"/>
    </q-item>
    <q-item v-if="isEditing">
      <q-input v-model="content" />
      <q-btn label="update" @click="update" />
      <q-btn label="remove" @click="remove" />
    </q-item>
  </q-item>
</template>
