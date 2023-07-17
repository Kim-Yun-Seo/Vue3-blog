<script setup lang="ts">

import { onMounted, ref } from 'vue'

import { collection, query, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { db } from 'src/boot/firebase'

import PostListItem from './PostListItem.vue'

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([])

const getData = async () => {
  const q = query(collection(db, 'posts'))
  const querySnapshot = await getDocs(q)

  items.value = querySnapshot.docs
}

onMounted(() => {
  return getData()
})

</script>

<template>
  <q-list>
    <PostListItem
      v-for="item in items"
      :key = "item.id"
      :item = "item"
      />
  </q-list>
  <q-page-sticky positon="bottom-right" :offset="[18,18]">
    <q-btn round color="pink" icon="mdi-pencil" to="/write"/>
  </q-page-sticky>
</template>
