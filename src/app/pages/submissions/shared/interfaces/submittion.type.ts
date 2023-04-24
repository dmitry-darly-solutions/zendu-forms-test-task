import { EStatuses } from '../constants/statuses.enum';

export interface ISubmissionType {
  task: string;
  status: EStatuses;
  from: string;
  to: string;
  customerAddress: string;
  dueDate: string;
}
