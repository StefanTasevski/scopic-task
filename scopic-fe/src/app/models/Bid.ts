import {Item } from "./Item"

export interface Bid {
    id: bigint ,
    price: number,
    bidder: string,
    item: Item,
}