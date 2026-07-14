/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TNeeds {
  NeedTitle:string;
  parentNeedId:Types.ObjectId;
  createdAt:Date;
  updateAt:Date;
}
