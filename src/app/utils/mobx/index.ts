import { ObservableMap, IObservableArray } from 'mobx'

export * from 'mobx'
export * from 'mobx-react'
export { default as connect } from './connect'

// types override
/* tslint:disable */
export declare function keys<K>(map: ObservableMap<K, any>): Array<K>
export declare function keys<T extends Object>(obj: T): Array<string>
export declare function values<K, T>(map: ObservableMap<K, T>): Array<T>
export declare function values<T>(ar: IObservableArray<T>): Array<T>
export declare function values<T = any>(obj: T): Array<any>
