
import { Observable } from 'rxjs';
import { LiveUpdateChart } from '../@core/data/earning';
import { Series } from './series';
import { Events } from './events';
import { Measurments } from './measurments';
import { Identity } from './identity';
import { Severity } from './alarm';
import { BulkOperations } from './bulkOperations';

export abstract class DevicesData{
    abstract getMeasurmentLiveUpdateCardData(deviceId:number,seriesType:string,aggregation:string,from:string,to:string,pageSize:number,revert:boolean):  Observable<any[]>;
    abstract getMeasurmentCardData(deviceId:number,seriesType:string,aggregation:string,from:string,to:string,pageSize:number,revert:boolean): Observable<LiveUpdateChart>;
  abstract  getMeasurmentCardDataV2( deviceId: number, seriesType: string, aggregation: string, from: string, to: string, pageSize: number, revert: boolean): Observable<any[]>;
abstract GetMeasurmentsV2(deviceID:number,seriesType:string,aggregationType:string,dateFrom:string,dateTo:string,pageSize:number,revert:boolean);


}


export  class Devices {

   
    managedObjects:ManagedObject;
    statistics:Statistics;
    c8y_SupportedSeries:string[];
    c8y_SupportedMeasurements:string[];
events:Events;
series:Series;
controls:BulkOperations;
measurments:Measurments;
identity : Identity;
severity:Severity;

}
interface AssetParents{
    references:ManagedObject[];
}
interface AdditionParents{
    self:string;
    references:[];
}
   
interface ManagedObject{
    additionParents:AdditionParents;
    assetParents:AssetParents;
    c8y_ActiveAlarmsStatus:{};
    c8y_Availability:any;
    c8y_Connection:{};
    c8y_Hardware:any;
    c8y_IsDevice:{};
    c8y_Position:{};
    c8y_RequiredAvailability:{};
    c8y_SupportedOperations:[];
    childAdditions:AdditionParents;
    childAssets:AdditionParents;
    childDevices:AdditionParents;
    com_cumulocity_model_Agent:{};
    creationTime:string;
    deviceParents:AdditionParents;
    id:string;
    lastUpdated:string;
    name:string;
    owner:string;
    self:string;
    type:string;

}
export interface Statistics {
    totalPages: number;
    currentPage: number;
    pageSize: number;
}
