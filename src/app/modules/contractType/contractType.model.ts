import mongoose, { model, Schema } from "mongoose";

import { string } from "zod";
import { TContractType } from "./contractType.interface";

const ContractTypeSchema = new Schema<TContractType>(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },

  }
);

export const ContractType = model<TContractType>("ContractType", ContractTypeSchema);
