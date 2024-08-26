import { Map } from './map'

export class HashMap<K, V> implements Map<K, V> {
  private size!: number
  private buckets!: MapEntry<K, V>[][]
  private readonly loadFactor = 0.75

  constructor() {
    this.clear()
  }

  getSize(): number {
    return this.size
  }

  set(key: K, value: V): void {
    const loadFactor = this.size / this.buckets.length
    if (loadFactor > this.loadFactor) {
      this.resize()
    }

    const index = this.hash(key)
    const bucket = this.buckets[index]

    if (bucket.length === 0) {
      bucket.push(new MapEntry(key, value))
      this.size++
      return
    }

    for (const entry of bucket) {
      if (entry.key === key) {
        entry.value = value
        return
      }
    }

    bucket.push(new MapEntry(key, value))
    this.size++
  }

  get(key: K): V | null {
    const index = this.hash(key)
    const bucket = this.buckets[index]

    for (const entry of bucket) {
      if (entry.key === key) {
        return entry.value
      }
    }

    return null
  }

  delete(key: K): void {
    const index = this.hash(key)
    const bucket = this.buckets[index]

    for (const entry of bucket) {
      if (entry.key === key) {
        bucket.splice(bucket.indexOf(entry), 1)
        this.size--
        return
      }
    }
  }

  has(key: K): boolean {
    const index = this.hash(key)
    const bucket = this.buckets[index]

    for (const entry of bucket) {
      if (entry.key === key) {
        return true
      }
    }

    return false
  }

  clear(): void {
    this.size = 0
    this.initializeBuckets(16)
  }

  keys(): K[] {
    const keys: K[] = []
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        keys.push(entry.key)
      }
    }

    return keys
  }

  values(): V[] {
    const values: V[] = []
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        values.push(entry.value)
      }
    }

    return values
  }

  entries(): MapEntry<K, V>[] {
    const entries: MapEntry<K, V>[] = []
    for (const bucket of this.buckets) {
      for (const entry of bucket) {
        entries.push(entry)
      }
    }

    return entries
  }

  private initializeBuckets(amount: number): void {
    this.buckets = []
    for (let i = 0; i < amount; i++) {
      this.buckets.push([])
    }
  }

  protected hash(key: K): number {
    let hash = 0

    for (let i = 0; i < String(key).length; i++) {
      hash = (hash << 5) - hash + String(key).charCodeAt(i)
    }

    return hash % this.buckets.length
  }

  private resize(): void {
    const entries = this.entries()

    this.initializeBuckets(this.buckets.length * 2)
    this.size = 0

    for (const entry of entries) {
      this.set(entry.key, entry.value)
    }
  }
}

export class MapEntry<K, V> {
  key: K
  value: V

  constructor(key: K, value: V) {
    this.key = key
    this.value = value
  }
}
