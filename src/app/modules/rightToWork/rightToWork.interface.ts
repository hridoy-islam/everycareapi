import { Types } from "mongoose";

export interface TLogEntry {
  title: string;
  date: Date; // ISO string or formatted date
  updatedBy: string;
}

export interface TRightToWork {
  employeeId: Types.ObjectId;
  nextCheckDate?: Date;

  logs?: TLogEntry[];
}
