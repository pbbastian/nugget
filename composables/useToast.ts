import { ref } from 'vue'

export interface Toast {
  id: number
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
  duration?: number
  _timer?: ReturnType<typeof setTimeout>
}

const toasts = ref<Toast[]>([])
let nextId = 0

export function useToast() {
  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index !== -1) {
      const toast = toasts.value[index]

      if (toast._timer) {
        clearTimeout(toast._timer)
      }

      toasts.value.splice(index, 1)
    }
  }

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = nextId++
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? 3000,
    }

    if (newToast.duration && newToast.duration > 0) {
      newToast._timer = setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }

    toasts.value.push(newToast)

    if (toasts.value.length > 5) {
      const removed = toasts.value.shift()
      if (removed) {
        removeToast(removed.id)
      }
    }

    return id
  }

  const success = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'success', title, message, duration })
  }

  const error = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'error', title, message, duration })
  }

  const info = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'info', title, message, duration })
  }

  const warning = (title: string, message?: string, duration?: number) => {
    return addToast({ type: 'warning', title, message, duration })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  }
}
