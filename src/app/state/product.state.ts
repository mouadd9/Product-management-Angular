// here we will specify the type of events we will send from the ProductNavBar to the ProductsComponent
export enum ProductActionsType {
    GET_ALL_PRODUCTS,
    GET_SELECTED_PRODUCTS,
    GET_AVAILABLE_PRODUCTS,
    SEARCH_PRODUCTS, 
    NEW_PRODUCTS,
    DELETE_PRODUCT,
    SELECT_PRODUCT
} 


// this is the structure of an Event , it has a type and a payload
export interface ActionEvent{
    type:ProductActionsType , // here we specify what type of action we want to do 
    payload:any
}


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