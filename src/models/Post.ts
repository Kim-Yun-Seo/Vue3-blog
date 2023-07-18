import {
  FirestoreDataConverter, doc, setDoc,
  Timestamp, collection, query, getDocs,
  // updateDoc,
  deleteDoc,
  serverTimestamp,
  SetOptions
} from 'firebase/firestore'
import { QEditor } from 'quasar'
import { db } from 'src/boot/firebase'

export class Post {
  // eslint
  // eslint-disable-next-line no-useless-constructor
  constructor (
    readonly title: string,
    readonly content: string,
    readonly createdAt?: Date | undefined,
    readonly updatedAt?: Date
  ) { }
}

const converter:FirestoreDataConverter<Post> = {
  toFirestore (model: Post, options?: SetOptions) {
    console.log(options)
    if (options) {
      return Object.assign(model, { updatedAt: serverTimestamp() })
      // newDate() 보다는 진짜 서버의 시간을 알려주는 serverTimestamp를 사용하는 게 낫다
    }
    return {
      title: model.title,
      content: model.content,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
  fromFirestore (snapshot) {
    const data = snapshot.data()
    return new Post(
      data.title,
      data.content,
      data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
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
