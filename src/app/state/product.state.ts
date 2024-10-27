export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}


// generic interface 
export interface AppDataState<T> {
    dataState?:DataStateEnum,
    data?:T,
    errorMessage?:string 
}