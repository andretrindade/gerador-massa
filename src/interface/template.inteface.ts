import { Document } from 'mongoose';
export interface ITemplate extends Document {
    readonly api: string;
    readonly endpoint: string;
    readonly version: string;
    readonly method: string;
    readonly location: string;
    readonly template: any;
}