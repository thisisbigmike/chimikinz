import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  limit,
  getDocs,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDemoApiKeyForChimikinzProject',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'chimikinz.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'chimikinz-eth',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'chimikinz-eth.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:abcdef123456',
}

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app)

export type FirestoreUserData = {
  address: string
  oddlingsCount: number
  updatedAt: string
}

/**
 * Fetches user profile directly from Firestore by wallet address
 */
export async function getUserFromFirestore(address: string): Promise<FirestoreUserData | null> {
  if (!address) return null
  try {
    const userRef = doc(db, 'users', address.toLowerCase())
    const snapshot = await getDoc(userRef)
    if (snapshot.exists()) {
      return snapshot.data() as FirestoreUserData
    }
    return null
  } catch (error) {
    console.warn('Firestore getUser note:', error)
    return null
  }
}

/**
 * Fetches user list from Firestore for admin panel
 */
export async function fetchFirestoreLeaderboard(topCount = 50) {
  try {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, limit(topCount))
    const querySnapshot = await getDocs(q)

    const userList: FirestoreUserData[] = []
    querySnapshot.forEach((docSnap) => {
      userList.push(docSnap.data() as FirestoreUserData)
    })
    return userList
  } catch (e) {
    console.warn('Firestore user fetch fallback:', e)
    return []
  }
}
