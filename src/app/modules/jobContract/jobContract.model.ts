/* eslint-disable no-unused-vars */
import { Schema, model, Types } from 'mongoose';
import { TJobContract } from './jobContract.interface';

const JobContractSchema = new Schema<TJobContract>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    contractTypeId:{ type: Schema.Types.ObjectId, ref: 'ContractType',required: true },

    contractContent:{ type: String,required:true },


    signatureUrl: { type: String },
    
  },
  { timestamps: true }
);

export const JobContract = model<TJobContract>('JobContract', JobContractSchema);
