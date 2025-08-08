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

export function dedupe(obj: any) {
  const seen = new WeakSet()
  let count = 0
  visit(obj, (value) => {
    if (typeof value === 'object' && value && !Array.isArray(value)) {
      if (seen.has(value)) {
        if (!value.$ref) {
          value.$ref = count++
        }
        return { $ref: value.$ref }
      }
      else {
        seen.add(value)
      }
    }
    return value
  })
  return obj
}

function hasOneOrMoreKeys(obj: object): boolean {
  let count = 0
  for (const _ in obj) {
    if (++count > 1) {
      return false
    }
  }
  return true
}

export function resolveRefs(obj: any) {
  const cache = new Map()
  return JSON.parse(obj, (_, value) => {
    if (value && typeof value === 'object' && '$ref' in value) {
      const $ref = value.$ref
      let cached = cache.get($ref)
      if (!cached) {
        if (hasOneOrMoreKeys(value)) {
          cached = {}
        }
        else {
          delete value.$ref
          cached = value
        }
        cache.set($ref, cached)
      }
      else if (!hasOneOrMoreKeys(value)) {
        delete value.$ref
        Object.assign(cached, value)
      }

      return cached
    }

    return value
  })
}
