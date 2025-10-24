import type { UseFetchOptions } from '#app'

function flattenInternal(data: any[], map: { [id: number]: any }, v: any): any {
  if (typeof v !== 'object') {
    return v
  }

  if ('id' in v) {
    if (v.id in map) {
      return { $ref: map[v.id] }
    }
  }

  const clone: any = {}
  for (const k in v) {
    clone[k] = flattenInternal(data, map, [k])
  }

  if ('id' in v) {
    const idx = data.push(clone) - 1
    map[v.id] = idx
    return { $ref: idx }
  }

  return clone
}

function flatten(v: any): any[] {
  const data: any[] = []
  flattenInternal(data, {}, v)
  return data
}

function deepClone<T>(v: T): T {
  if (typeof v !== 'object') {
    return v
  }
  const clone: any = {}
  for (const k in v) {
    clone[k] = deepClone(v[k])
  }
  return clone
}

type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]>; } | T | undefined

function deepDiff(o1: any, o2: any): any {
  if (typeof o1 !== 'object' && typeof o2 !== 'object') {
    if (o1 != o2) {
      return o2
    }
    else {
      return undefined
    }
  }
  else if (Array.isArray(o1) && Array.isArray(o2)) {
    const diff = []

    let different = o1.length != o2.length
    const minLength = o1.length < o2.length ? o1.length : o2.length
    for (let i = 0; i < minLength; i++) {
      const d = deepDiff(o1[i], o2[i])
      diff.push(d)
      if (d !== undefined) {
        different = true
      }
    }

    for (let i = o1.length; i < o2.length; i++) {
      diff.push(o2[i])
    }

    return different ? diff : undefined
  }
  else if (o1 && o2 && typeof o1 == 'object' && typeof o2 == 'object') {
    let diff: any
    for (const k1 in o1) {
      if (!(k1 in o2)) {
        diff ??= {}
        diff[k1] = undefined
      }
    }
    for (const k2 in o2) {
      if (!(k2 in o1)) {
        diff ??= {}
        diff[k2] = o2[k2]
      }
      else {
        const d = deepDiff(o1[k2], o2[k2])
        if (d !== undefined) {
          diff ??= {}
          diff[k2] = d
        }
      }
    }
    return diff
  }
  else {
    return o2
  }

  // let diff: DeepPartial<T> = {};
  // for (let k1 in o1) {
  //     if (!(k1 in o2)) {
  //         diff[k1] = o1[k1];
  //     }
  // }
  // for (let k in o2) {
  //     let v2 = o2[k];
  //     if (!(k in o1)) {
  //         diff[k] = v2;
  //         continue;
  //     }

  //     let v1 = o1[k];

  //     if (typeof v1 !== "object" && typeof v2 !== "object") {
  //         if (v1 != v2) {
  //             diff[k] = v2;
  //         }
  //     } else if (Array.isArray(v1) && Array.isArray(v2)) {
  //         if (v1.length !== v2.length) {
  //             diff[k] = v2;
  //         } else {
  //             let different = false;
  //             for (let i = 0; i < v2.length; i++) {
  //                 if (v1[i] != v2[i]) {
  //                     different = true;
  //                     break;
  //                 }
  //             }
  //             if (different) {
  //                 diff[k] = v2;
  //             }
  //         }
  //     } else if (v1 && v2) {
  //         diff[k] = deepDiff(v1, v2);
  //     }
  // }
  // return diff;
}

export function useApi<T extends object>(plural: string, singular: string, defaultValue: T) {
  return async (id: Ref<any>) => {
    const data: Ref<T | null> = ref(null)
    const saving = ref(false)
    let reference: DeepPartial<T> = {}

    const save = async () => {
      if (data.value == null) { throw new Error('Cannot save before data is loaded') }
      if (saving.value) { throw new Error('A save request is already in progress') }

      try {
        saving.value = true
        const isCreate = id.value === 'add'
        const url = isCreate ? `/api/${plural}` : `/api/${plural}/${id.value}`
        const change = deepDiff(reference, data.value)
        // if ('id' in change) {
        //     delete change.id;
        // }
        await $fetch(url, {
          method: isCreate ? 'POST' : 'PUT',
          body: {
            [singular]: change,
          },
        })
      }
      finally {
        saving.value = false
      }
    }

    watch(id, async (newId) => {
      if (saving.value) { throw new Error('Id changed while saving was in progress') }

      if (newId === 'add') {
        data.value = Object.assign({}, defaultValue)
      }
      else if (newId !== null && newId !== undefined) {
        data.value = null
        const result = await useFetch<any>(`/api/${plural}/${id.value}`)
        if (result.data.value == null) { return }
        data.value = result.data.value[singular]
        reference = data.value ? deepClone(data.value) : {}
      }
    }, { immediate: true })

    return { data, saving, save }
  }
}

export function useAPI<T>(
  resource: Ref<string> | string,
  options: UseFetchOptions<T> = {},
) {
  return useFetch(resource, {
    ...options,
    $fetch: useNuxtApp().$api as typeof $fetch,
  })
}

function visit(obj: any, f: (value: any) => any) {
  for (const key in obj) {
    let value = obj[key]
    const newValue = f(value)
    if (newValue !== value) {
      obj[key] = value = newValue
    }
    if (typeof value === 'object' && value) {
      visit(value, f)
    }
  }
}

export function useEdit(
  resource: string | (() => string),
  data: Ref<{ id?: any } | null>,
  callback?: (id: any, slug: any) => Promise<void>,
) {
  const saving = ref(false)
  const success = ref(true)
  const { error: showError, success: showSuccess } = useToast()
  return {
    saving,
    success,
    async save() {
      if (data.value == null) { throw new Error('Cannot save before data is loaded') }
      if (saving.value) { throw new Error('A save request is already in progress') }

      try {
        saving.value = true
        const id = data.value.id
        const isCreate = id === 'add'
        const url = isCreate ? `/api/${resource}` : `/api/${resource}/${id}`
        const seen = new WeakSet()
        let count = 0
        const body = structuredClone(toRaw(data.value))
        delete body.id
        visit(body, (value) => {
          if (typeof value === 'object' && value && !Array.isArray(value)) {
            if (seen.has(value)) {
              if (!value.$ref) {
                value.$ref = count++
              }
              return { $ref: value.$ref }
            }
            else {
              delete value.createdAt
              delete value.updatedAt
              seen.add(value)
            }
          }
          return value
        })
        const result: any = await $fetch(url, {
          method: isCreate ? 'POST' : 'PUT',
          body,
        })
        if (callback) {
          await callback(result.id, result.slug)
        }
        success.value = true
        const resourceName = resource === 'recipes' ? 'recipe' : 'ingredient'
        showSuccess('Saved!', isCreate ? `Your ${resourceName} has been created` : 'Your changes have been saved')
      }
      catch {
        success.value = false
        showError('Error saving', 'An error occurred. Please try again.')
      }
      finally {
        saving.value = false
      }
    },
  }
}

export async function useDelete(resource: string, id: string | number | null) {
  const url = `/api/${resource}/${id}`
  await $fetch(url, {
    method: 'DELETE',
  })
}
