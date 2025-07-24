export class Identity{
    externalIds:ExternalId;
    self:string;
}

     interface ManagedObject {
        self: string;
        id: string;
    }

     interface ExternalId {
        managedObject: ManagedObject;
        externalId: string;
        self: string;
        type: string;
    }

     interface RootObject {
        externalIds: ExternalId[];
        self: string;
    }


