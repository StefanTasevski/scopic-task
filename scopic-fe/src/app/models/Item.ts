import { Timestamp } from 'rxjs';

export interface Item {
    id: bigint,
    name: string,
    description: string,
    start: Date,
    finish: Date,
    maxBid: number
}