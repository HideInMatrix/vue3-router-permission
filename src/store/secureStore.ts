import { StorageLike } from 'pinia-plugin-persistedstate'
import CryptoJS from 'crypto-js'

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY  // 自定义加密密钥

// 自定义加密存储
export const SelfStorage: StorageLike = {
  setItem(key: string, value: string) {
    // 加密值
    const encryptedValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString()
    
    // 存储加密后的值
    localStorage.setItem(key, encryptedValue)
  },
  getItem(key: string): string | null {
    // 获取加密值
    const encryptedValue = localStorage.getItem(key)
    if (encryptedValue) {
      // 解密
      const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY)
      const decryptedValue = bytes.toString(CryptoJS.enc.Utf8)
      return decryptedValue || null
    }
    return null
  },
}
