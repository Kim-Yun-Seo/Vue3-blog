<script setup lang="ts">

import { onMounted, ref } from 'vue'

import { // collection, query, getDocs, DocumentData
  QueryDocumentSnapshot
} from 'firebase/firestore'
// import { db } from 'src/boot/firebase'

import PostListItem from './PostListItem.vue'
import { Post, getPosts } from 'src/models/Post'

const items = ref<QueryDocumentSnapshot<Post>[]>([])

const getData = async () => {
  // const q = query(collection(db, 'posts'))
  // const querySnapshot = await getDocs(q)

  const querySnapshot = await getPosts()
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
      @refresh="getData"
      />
      <!-- 자식에서 refresh를 전달한다고 선언해서 여기서 @refresh가 사용가능함 -->
      <!-- 여기서 부모는 emit한걸 듣는 귀를 열어줘야함. -->
  </q-list>
  <q-page-sticky positon="bottom-right" :offset="[18,18]">
    <q-btn round color="pink" icon="mdi-pencil" to="/write"/>
  </q-page-sticky>
</template>
