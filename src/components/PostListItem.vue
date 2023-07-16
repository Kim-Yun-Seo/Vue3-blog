<script setup lang="ts">
import { computed } from 'vue'
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
// defineProps, collection, query, getDocs

const props = defineProps<{
  item:QueryDocumentSnapshot<DocumentData>
}>()

const post = computed(() => props.item.data())

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
