<script setup lang="ts">
// 얘가 부모

import { onMounted, ref } from 'vue'

import { collection, query, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { db } from 'src/boot/firebase'

import PostListItem from './PostListItem.vue'
// db는 firestore의 정보를 가져와서 담아놓은 변수 이름이다.

const items = ref<QueryDocumentSnapshot<DocumentData>[]>([])
//  QueryDocumentSnapshot은 너의 firestore database(요청의 일환으로서) 안에 있는 document를 읽어서 포함하고 있는 것.
//  그 문서는 존재가 보장되고 해당 데이터는 .data() 또는 .get(<field>)으로 추출하여 특정 필드를 가져올 수 있습니다.
// DocumentData 라는 type으로 구성된 배열로 ref를 선언함. (처음엔 빈 배열로 초기화를 한다)

const getData = async () => {
  const q = query(collection(db, 'posts'))
  // firestore 에 있는 collection 묶음을 요청해서
  // 그래서 요청을 하는데(collection에서 firestore의 db의 'posts' 라는 이름을 가진 애들을.
  // 요청해서 가져온 값을 q에다 넣기
  // query = 찾는조건? 데이터에 필요한 것들 추출해내는 개발(?)

  console.log('aaaa-----', db)
  console.log('bbbb----', collection(db, 'posts'))
  console.log(q)
  const querySnapshot = await getDocs(q)
  console.log('ccc------', querySnapshot)
  // 그래서 querySnapshot에 비동기 방식으로 기다렸다가 q를 getDocs방식으로 처리하고 값을 넣는다.
  items.value = querySnapshot.docs
  // 값이 바꼈으니까 이제 새로 랜더링 할 차례임 (ref 때문에)
  // ref를 사용했기 때문에 .value를 사용한다
  // items의 밸류값에 위에서 정의한 querySnapshot의 docs를 대입하는데
  // 이때 .docs는 getDocs함수를 실행하면 생기는 값이다.
  console.log(items.value)
}
// 그리고 아직 까지는 함수가 실행되지 않았움.

onMounted(() => {
  return getData()
})

// onMounted는 브라우저가 이 파일을 실행하면 자동으로 실행되는 함수
// 이함수의 인자는 getData()가 리턴하는 리턴값을 인자로 하는 arrowfunction 의 return이다.
// 이때 getData()함수는 return 값이 undefined 이다.

</script>

<template>
  <q-list>
    <PostListItem
      v-for="item in items"
      :key = "item.id"
      :item = "item"
      :id = "item.id"
      />
      <!-- import 해온거 사용함. -->
      <!-- item은 자식한테 주려고 쓴거다.  -->
      <!-- 자식 한테 니가 item이라고 알려주는거 -->
  </q-list>
  <!-- q-list 박스를 만든다 -->
  <!-- 포스트한 아이템 리스트 박스를 만든다 -->
  <!-- 그 속성은  -->
  <!-- v-for은 항목 목록을 랜더링한다. items안에 있는 item을 렌더링 -->
  <!-- 우리가 자체 정의한 key는 item.id를 표현하는 부분이고 -->
  <!-- 우리가 자체 정의한 item는 item 그 자체를 표현하는 부분이고 -->

  <q-page-sticky positon="bottom-right" :offset="[18,18]">
    <q-btn round color="pink" icon="mdi-pencil" to="/write"/>
  </q-page-sticky>
</template>
