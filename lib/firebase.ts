import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  collection,
  query,
  orderBy,
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
  method: string
  connectedAt: string
  oddlingsCount: number
  points: number
  completedQuests: string[]
  favorites: number[]
  updatedAt: string
}

// --- FIRESTORE USER SYNCHRONIZATION HELPERS ---

/**
 * Saves or updates user session profile and stats in Firestore
 */
export async function syncUserToFirestore(userData: {
  address: string
  method?: string
  connectedAt?: string
  oddlingsCount?: number
  points?: number
  completedQuests?: string[]
  favorites?: number[]
}) {
  if (!userData.address) return

  try {
    const userRef = doc(db, 'users', userData.address.toLowerCase())
    const snapshot = await getDoc(userRef)

    const existingData = snapshot.exists() ? snapshot.data() : {}

    const updatedData = {
      ...existingData,
      address: userData.address,
      method: userData.method || existingData.method || 'Web3',
      connectedAt: userData.connectedAt || existingData.connectedAt || new Date().toLocaleTimeString(),
      oddlingsCount: userData.oddlingsCount ?? existingData.oddlingsCount ?? 0,
      points: userData.points ?? existingData.points ?? 0,
      completedQuests: userData.completedQuests ?? existingData.completedQuests ?? [],
      favorites: userData.favorites ?? existingData.favorites ?? [],
      updatedAt: new Date().toISOString(),
    }

    await setDoc(userRef, updatedData, { merge: true })
  } catch (error) {
    console.warn('Firestore sync note:', error)
  }
}

/**
 * Listens to real-time changes for a user profile in Firestore
 */
export function subscribeToUserFirestore(
  address: string,
  onUpdate: (data: FirestoreUserData) => void
) {
  if (!address) return () => {}

  const userRef = doc(db, 'users', address.toLowerCase())
  return onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      onUpdate(docSnap.data() as FirestoreUserData)
    }
  })
}

/**
 * Fetches top Charm Point leaderboard from Firestore
 */
export async function fetchFirestoreLeaderboard(topCount = 10) {
  try {
    const usersRef = collection(db, 'users')
    const q = query(usersRef, orderBy('points', 'desc'), limit(topCount))
    const querySnapshot = await getDocs(q)

    const leaderboard: FirestoreUserData[] = []
    querySnapshot.forEach((docSnap) => {
      leaderboard.push(docSnap.data() as FirestoreUserData)
    })
    return leaderboard
  } catch (e) {
    console.warn('Firestore leaderboard fetch fallback:', e)
    return []
  }
}
