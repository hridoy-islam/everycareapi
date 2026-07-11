import { Types } from "mongoose";


export interface TLeaver {
  _id: Types.ObjectId;
  userId: Types.ObjectId; 
  approvedBy: Types.ObjectId; 
  note: String;
  leavingReason: String;
  terminationDate: Date;
  dissmissalReason: String;
  documents: String[];
  createdAt: Date;
  updatedAt: Date;
  

}
