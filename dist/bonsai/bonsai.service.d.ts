import { Repository } from 'typeorm';
import { Bonsai } from '../typeorm/entities/index.js';
import { CreateBonsaiParams } from '../utils/types.js';
export declare class BonsaiService {
    private bonsaiRepository;
    constructor(bonsaiRepository: Repository<Bonsai>);
    getAll(): Promise<Bonsai[]>;
    createBonsai(bonsaiDetails: CreateBonsaiParams): Promise<Bonsai>;
}
