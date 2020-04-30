import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {PathfinderAction} from "../../db/schemas/pathfinder/PathfinderAction";
import {PathfinderActionForm} from "../../validation/pathfinder/PathfinderActionForm";
import {PathfinderActionDataToModelMapper} from "../../mapping/fromDataToModel/pathfinder/PathfinderActionDataToModelMapper";
import {PathfinderActionRepository} from "../../repositories/pathfinder/PathfinderActionRepository";
import {PathfinderActionModel} from "../../model/pathfinder/PathfinderActionModel";

@Service()
export class PathfinderActionService {
    private readonly pathfinderActionRepository: PathfinderActionRepository;

    constructor(
        pathfinderActionRepository: PathfinderActionRepository
    ) {
        this.pathfinderActionRepository = pathfinderActionRepository;
    }

    async create(data, include?: Includeable[]): Promise<PathfinderActionModel> {
        const actionFormValidator = new PathfinderActionForm();
        const validatedData = actionFormValidator.validate(data.action);
        if (validatedData) {
            const mapper = new PathfinderActionDataToModelMapper();
            const actionModel = mapper.map(validatedData);
            return this.pathfinderActionRepository.create(actionModel);
        }
        return null;
    }

    async delete(data: object) {

    }

    async update(data: object, include?: Includeable[]) {

    }

    async findBy(key, value, include?: Includeable[]): Promise<PathfinderAction[]> {
        const condition = {};
        const valueNew = value.map(elem => {
            return elem.name
        });
        condition[key] = valueNew;
        return PathfinderAction.findAll(
            {where: condition, include: include});
    }

    async findOneBy(key, value, include?: Includeable[]) {

    }

    async findAll(): Promise<PathfinderActionModel[]> {
        return this.pathfinderActionRepository.findAll();
    }
}