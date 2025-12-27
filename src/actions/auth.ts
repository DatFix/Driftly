'use server'

import { cookies } from 'next/headers'
import { encrypt, decrypt } from '@/lib/session'

export async function createSession(userId: string, userData: any) {
  const sessionData = {
    userId,
    ...userData,
  }
  
  const encryptedSession = await encrypt(sessionData)
  
  const cookieStore = await cookies()
  cookieStore.set('session', encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
    sameSite: 'lax',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

// THÊM HÀM NÀY
export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  
  if (!session) return null
  
  return await decrypt(session)
}

//******************************************************************************************************//

export async function createUserSession(userId: string, userData: any) {
  const sessionData = {
    userId,
    ...userData,
  }
  
  const encryptedSession = await encrypt(sessionData)
  
  const cookieStore = await cookies()
  cookieStore.set('user_session', encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
    sameSite: 'lax',
  })
}

export async function deleteUserSession() {
  const cookieStore = await cookies()
  cookieStore.delete('user_session')
}

// THÊM HÀM NÀY
export async function getUserSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('user_session')?.value
  
  if (!session) return null
  
  return await decrypt(session)
}

export async function editUserSession(updatedData: Partial<any>) {
  const cookieStore = await cookies()
  const session = cookieStore.get('user_session')?.value

  if (!session) return null

  const decrypted = await decrypt(session)

  const newSession = {
    ...decrypted,
    ...updatedData, // merge dữ liệu mới
  }

  const encryptedSession = await encrypt(newSession)

  // Ghi lại cookie với cùng tên, sẽ ghi đè nhưng thời gian vẫn giữ nguyên cookie nếu không đặt maxAge
  cookieStore.set('user_session', encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
    // không đặt maxAge -> trình duyệt sẽ dùng cookie cũ, vẫn còn thời gian còn lại
  })
  
  return newSession
}
