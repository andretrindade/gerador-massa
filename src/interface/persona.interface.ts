import { Document } from 'mongoose';
export interface IPersona extends Document{
    readonly persona: any;
}