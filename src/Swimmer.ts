export interface ISwimmer {
    id: any;
    name: string;
    butterfly: number;
    backstroke: number;
    breaststroke: number;
    freestyle: number;
}

export class Swimmer implements ISwimmer {
    id!: string;
    name!: string;
    butterfly!: number;
    backstroke!: number;
    breaststroke!: number;
    freestyle!: number;

    constructor() {
        return {
            id: "",
            name: "",
            butterfly: 0,
            backstroke: 0,
            breaststroke: 0,
            freestyle: 0,
        }
    }
}

export interface SwimmerRowData {
    id: string;
    name: string;
    butterfly: string;
    backstroke: string;
    breaststroke: string;
    freestyle: string;
}
