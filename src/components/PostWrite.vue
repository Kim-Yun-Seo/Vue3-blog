<script setup lang="ts">
import { ref } from 'vue'
import { db } from 'boot/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
// collection, addDoc

const $q = useQuasar()
const title = ref('')
const content = ref('')

const existRule = (val:string) => (val && val.length > 0) || '무언가를 쓰세요'
const router = useRouter()

const onSubmit = async () => {
  await setDoc(doc(db, 'posts', title.value), {
    title: title.value,
    content: content.value
    // title 자체를 id로 만들기 때문에 데이터에 접근하기가 상당히 쉬워짐
  })
  $q.notify({
    message: '보내기에 성공하였습니다.',
    color: 'purple',
    avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
  })
  await router.push('/list')
}

const onReset = () => {
  //
  title.value = ''
  content.value = ''
}

</script>

<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-card>
      <v-card>
        <q-card-section>
          <q-input
            filled
            v-model="title"
            label="제목"
            hint="제목을 쓰세요"
            lazy-rules
            :rules="[ existRule ]"

          />
          <!-- 바로 윗윗줄은 아무것도 안 쓰면 안된다는 규칙임. string 이니까 length로 -->
          <q-input
            v-model="content"
            filled
            type="textarea"
            label="내용"
            hint="내용을 쓰세요"
            lazy-rules
            :rules="[
              existRule
              // val => val !== null && val !== '' || 'Please type your age',
              // val => val > 0 && val < 100 || 'Please type a real age'
            ]"
          />
        </q-card-section>
        <q-card-actions>
          <q-space />
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-card-actions>
      </v-card>
    </q-card>
  </q-form>

</template>
