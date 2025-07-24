import { Statistics } from './devices';

export class Alarm{

   
    alarms: ChildAlarm[];
    next: string;
    self: string;
    statistics:Statistics;



}


export class Severity{
    public CRITICAL:number;
   public MAJOR:number;
   public MINOR :number;
  public  WARNING:number;

    getSeverities():string[] { 
        return new Array("CRITICAL","MAJOR","MINOR","WARNING") 
     } 

     getSeveritiesObj():any[] { 
        return new Array({ name :"CRITICAL",color:"red" , from:'1970-01-01',to:'2020-09-10T11:00:52%2B05:00'} , { name :"MAJOR",color:"orange" , from:'1970-01-01',to:'2020-09-10T11:00:52%2B05:00'},{ name :"MINOR",color:"yellow" , from:'1970-01-01',to:'2020-09-10T11:00:52%2B05:00'},{ name :"WARNING",color:"blue" , from:'1970-01-01',to:'2020-09-10T11:00:52%2B05:00'}) 
     } 
}

 

 interface History {
    auditRecords: any[];
    self: string;
}

 interface Source {
    name: string;
    self: string;
    id: string;
}

   class ChildAlarm {
    severity: string;
    creationTime: Date;
    count: number;
    history: History;
    source: Source;
    type: string;
    self: string;
    time: Date;
    text: string;
    id: string;
    status: string;
}


