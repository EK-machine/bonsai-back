import { BonsaiService } from './bonsai.service.js';
import { CreateBonsaiDto } from './dto/CreateBonsai.dto.js';
export declare class BonsaiController {
    private readonly bonsaiService;
    constructor(bonsaiService: BonsaiService);
    getAll(): Promise<import("../typeorm/entities/bonsai.entity.js").Bonsai[]>;
    createBonsai(createBonsaiDto: CreateBonsaiDto): Promise<void>;
}
