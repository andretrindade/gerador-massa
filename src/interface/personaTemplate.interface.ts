import { Document } from 'mongoose';
export interface IPersonaTemplate extends Document{
    
    readonly path : string[];
 
}