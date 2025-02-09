import { listenKeys, type StoreValue } from 'nanostores';

export default function subscribeKeys<
  SomeStore extends { get: () => StoreValue<SomeStore>; setKey: (key: any, value: any) => void }
>(
  $store: SomeStore,
  propsToListen: SomeStore extends { setKey: (key: infer Key, value: never) => unknown } ? readonly Key[] : never,
  callback: (_props: StoreValue<SomeStore>) => void
) {
  listenKeys($store, propsToListen, callback);
  // TODO 2023-12-23 jeremboo: Only return the props to listen key:value
  callback($store.get());
}
