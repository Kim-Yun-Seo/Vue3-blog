<script setup lang="ts">
import PostListItem from './PostListItem.vue'
import { db } from 'src/boot/firebase'
import { collection, query, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { onMounted, ref } from 'vue'

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([])

const getData = async () => {
  const q = query(collection(db, 'posts'))

  const querySnapshot = await getDocs(q)
  items.value = querySnapshot.docs
  console.log(items.value)
}

onMounted(() => getData())

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
