import {
  FirestoreDataConverter, doc, setDoc,
  Timestamp, collection, query, getDocs,
  // updateDoc,
  deleteDoc,
  serverTimestamp,
  SetOptions
} from 'firebase/firestore'
import { db } from 'src/boot/firebase'

export class Post {
  // eslint
  // eslint-disable-next-line no-useless-constructor
  constructor (
    readonly title: string,
    readonly content: string,
    readonly createdAt?: Date | undefined,
    readonly updatedAt?: Date
    // readonly 는 읽고 존재만 하지 값을 바꾸거나 하진 않는다는 뜻?
    // 초기화 후 수정할 수 없다.
  ) { }
}

const converter:FirestoreDataConverter<Post> = {
  // FirestoreDataConverter<T>는 T유형의 사용자 개체를 firestore 데이터로 변환하기 위해 .withconverter()를 사용하는 변환기이다.
  // 여기선 post를 firestore 데이터로 변환하기 위해 선언 한 것.
  // post자리는 원래 T generic 자리이기 때문에 Post라고 우리가 지정한 타입이 들어 갈 수 있는 것이다.
  toFirestore (model: Post, options?: SetOptions) {
    // AppModelType 유형의 커스텀 모델 객체를 DbModelType 유형의 일반 자바스크립트
    // 객체(Firestore 데이터베이스에 직접 쓰기에 적합)로 변환하기 위해 Firestore 에서 호출합니다.
    // setDoc() 과 함께 사용 , 및 merge:true 또는 mergeFields .
    // PartialWithFieldValue<T> 유형은 ArrayUnion() 과 같은 FieldValues를 속성 값으로 사용할 수 있도록 Partial<T> 확장합니다

    // setOptions는 merge의 여부를 판단하는 요소??
    console.log('-------', options)
    // {merge: true}라고 나옴
    if (options) {
      // {merge: true}면
      return Object.assign(model, { updatedAt: serverTimestamp() })
      // assign은 2번째 인자 객체의 모든 열거 가능한 속성을 복사해서 1번째 인자에 붙여넣기 하는것. 그리고 붙여넣기 완료한 1번을 return함
      // new Date() 보다는 진짜 서버의 시간을 알려주는 serverTimestamp를 사용하는 게 낫다
    }
    return {
      title: model.title,
      content: model.content,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
  fromFirestore (snapshot) {
    // Firestore 데이터를 AppModelType 유형의 객체로 변환하기 위해 Firestore 에서 호출합니다
    const data = snapshot.data()
    // 일반적으로 snapshot.data() 에서 반환된 데이터는 DbModelType 으로 사용 될 수 있다.

    return new Post(
      data.title,
      data.content,
      data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
      // instanceof는 앞에 있는 생성자의 프로토타입 속성이 뒤에 나오는 객체의 프로토타입체인 어딘가에 존재하는지를 boolean으로 return
      // 근데 존재하지 않을 수도 있으니까 삼항식이고 undefined로 표시한다.
      data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : undefined
    )
  }
}

export const setPost = (post: Post) => {
  const ref = doc(db, 'posts', post.title).withConverter(converter)
  return setDoc(ref, post)
}

export const getPosts = () => {
  const ref = collection(db, 'posts').withConverter(converter)
  const q = query(ref)
  return getDocs(q)
}

export const updatedPost = (id: string, content:string) => {
  const ref = doc(db, 'posts', id).withConverter(converter)
  // return updateDoc(ref, { content, updatedAt: new Date() })
  return setDoc(ref, { content }, { merge: true })
  // 업데이트가 됐다 = merge 가 true가 됐다는 의미
  // 원래 쓰던 updatedAt이랑 똑같이 작동하게 된다.
}

export const deletePost = (id: string) => {
  const ref = doc(db, 'posts', id)// .withConverter(converter)
  return deleteDoc(ref)
}
