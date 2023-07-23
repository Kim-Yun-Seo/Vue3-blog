import {
  FirestoreDataConverter, doc, setDoc,
  Timestamp, collection, query, getDocs,
  DocumentReference,
  deleteDoc,
  serverTimestamp,
  SetOptions,
  DocumentSnapshot
} from 'firebase/firestore'
import { db } from 'src/boot/firebase'
import { getUser, User } from './user'

export class Post {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    readonly title: string,
    readonly content: string,
    readonly userRef: DocumentReference,
    readonly createdAt?: Date | undefined,
    readonly updatedAt?: Date,
    public userSnapshot?: DocumentSnapshot<User> | undefined
  ) { }

  toJSON () {
    return {
      title: this.title,
      content: this.content,
      userRef: this.userRef,
      createdAt: this.createdAt || serverTimestamp(),
      updatedAt: this.updatedAt || serverTimestamp()
    }
  }

  updatedPost (id: string, content:string) {
    const ref = doc(db, 'posts', id).withConverter(converter)
    return setDoc(ref, { content }, { merge: true })
  }

  deletePost (id: string) {
    const ref = doc(db, 'posts', id)// .withConverter(converter)
    return deleteDoc(ref)
  }
}

const converter:FirestoreDataConverter<Post> = {
  toFirestore (model: Post, options?: SetOptions) {
    if (options) { return Object.assign(model, { updatedAt: serverTimestamp() }) }
    return model.toJSON()
  },
  fromFirestore (snapshot) {
    const data = snapshot.data()
    const uid = data.userRef instanceof DocumentReference ? data.userRef.id : ''
    const findUserSnapshot = userSnapshots.find(u => u.id === uid)

    return new Post(
      data.title,
      data.content,
      data.userRef,
      data.createdAt instanceof Timestamp ? data.createdAt.toDate() : undefined,
      data.updatedAt instanceof Timestamp ? data.updatedAt.toDate() : undefined,
      findUserSnapshot
    )
  }
}

export const setPost = (post: Post) => {
  const ref = doc(db, 'posts', post.title).withConverter(converter)
  return setDoc(ref, post)
}

const userSnapshots: DocumentSnapshot<User>[] = []
export const getPosts = async () => {
  const ref = collection(db, 'posts').withConverter(converter)
  const q = query(ref)
  const sn = await getDocs(q)
  let count = 0
  for (const postSnapshot of sn.docs) {
    const data = postSnapshot.data()
    const findUserSnapshot = userSnapshots.find(u => u.id === data.userRef.id)
    // 이미 아이디가 있다면 그 아이디가 있는지를 확인해서 1번만 체크한다.
    if (findUserSnapshot) continue
    // ()가 참이면 이 밑은 실행하지 않는다.
    const userSnapshot = await getUser(data.userRef.id)
    console.log(userSnapshot.data())
    userSnapshots.push(userSnapshot)
    console.log('count check', ++count)
  }
  return sn
}
