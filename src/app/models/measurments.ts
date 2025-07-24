

export class Measurments{

series:Series;
values:Values;
}

interface Series{
unit:string;
name:string;
type:string;

}
interface Values{
    [key: string]: Points;

}
interface Points{
    min:number;
    max:number;
}