import { MapEntry } from './hash_map'

export interface Map<K, V> {
  getSize(): number
  set(key: K, value: V): void
  get(key: K): V | null
  delete(key: K): void
  has(key: K): boolean
  clear(): void
  keys(): K[]
  values(): V[]
  entries(): MapEntry<K, V>[]
}
