<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  ref as rtRef,
  set, get, onValue, remove
} from 'firebase/database'
import { rtdb } from 'src/boot/firebase'

interface UserData {
  name: string;
  age: number;
}

const name = ref('aaa')
const age = ref(0)
const userRef = rtRef(rtdb, 'users/id')
const userData = ref<UserData>({ name: '', age: 0 })

const save = () => {
  return set(userRef, {
    name: name.value,
    age: age.value
  })
}

const read = async () => {
  const sn = await get(userRef)
  userData.value = sn.val() as UserData
  // 원래의 데이터 타입을 as " "의 방식으로 만들어서 대입해.
  // 데이터 치환? 포멧?
}

const removeData = () => {
  remove(userRef)
}

onMounted(() => {
  onValue(userRef, (sn) => {
    userData.value = sn.val() as UserData
  })
  // 이렇게 코드를 짜면 굳이 새로 할 필요 없이 자동으로 moundted 될 때 실행 가능
})

</script>

<template>
  <q-card>
    <q-card-section>test</q-card-section>
    <q-card-section>
      <q-input v-model="name" />
      <q-input v-model.number="age" type="number" />
    </q-card-section>
    <q-card-actions>
      <q-btn label="save" @click="save" />
      <q-btn label="read" @click="read" />
      <q-btn label="remove" @click="removeData" />
    </q-card-actions>
    <q-card-section>
      {{ userData }}
    </q-card-section>
  </q-card>
</template>
