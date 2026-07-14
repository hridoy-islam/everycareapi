/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TServiceuserNeed {
  serviceUserId:Types.ObjectId;
  note:string;
  needId:Types.ObjectId;
  createdAt:Date;
  updateAt:Date;
}
