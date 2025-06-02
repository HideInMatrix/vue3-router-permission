import { defineStore } from "pinia";

interface KeyStoreState {
  key: Record<string, any>; // key 是一个对象，key 是字符串，value 是任意类型
}

export const useKeyStore = defineStore('key', {
  state: (): KeyStoreState => ({
    key: {} // 初始的 key 为一个空对象
  }),

  actions: {
    // 获取 Key 数据
    async getKey(key: string): Promise<any> {
      if (import.meta.env.VITE_ENV === 'development') {
        // 在开发环境下调用 labc 函数
        const value = await window.labc(key);
        this.setKey([key, value]);
        return value;
      } else {
        // 在其他环境下调用 l0a1b2c 函数
        const value = await window.l0a1b2c(key);
        this.setKey([key, value]);
        return value;
      }
    },

    // 设置 Key 数据
    setKey(payload: [string, any]): void {
      const [key, value] = payload;
      // 如果 key 不存在，才赋值
      if (!this.key[key]) {
        this.key[key] = value;
      }
    }
  }
});
