import { Devices, Statistics } from './devices';

export class BulkOperations{


    next:string;
    operations:Operations[];
    statistics:Statistics;

   
}
interface Operations{
    c8y_Command:{};
   
    creationTime:string;
    description:string;
    deviceId:string;
    deviceName:string;
    id:string;
    self:string;
    status:string;

}
