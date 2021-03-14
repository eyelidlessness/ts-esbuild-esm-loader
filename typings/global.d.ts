interface Set<T> {
  has<V>(this: Set<T>, value: V): value is Extract<V & T, T>;
}
