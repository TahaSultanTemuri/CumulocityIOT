export class Events{


    next:string;
    self:string;
    events:ChildEvents;
}

interface  ChildEvents{
    creationTime:string;
    source:Source;

    type:string;
    self: string;
    time: string;
    text: string;
    id:string;
}
interface Source{

name:string;
self:string;
id:string;
}