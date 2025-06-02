import { ComponentInternalInstance, ref } from 'vue'

export const excludes = ref<string[]>([])

export function removeKeepAliveCache(instance: ComponentInternalInstance) {
    if (!excludes.value.includes(instance.type.name!)) {
        excludes.value.push(instance.type.name!)
    }
}

export function resetKeepAliveCache(instance: ComponentInternalInstance) {
    excludes.value = excludes.value.filter((item) => item !== instance.type.name)
}