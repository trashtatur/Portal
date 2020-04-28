import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {PathfinderAction} from "../db/schemas/pathfinder/PathfinderAction";
import {ActionForm} from "../validation/ActionForm";
import {ActionDataToModelMapper} from "../mapping/fromDataToModel/ActionDataToModelMapper";
import {PathfinderActionRepository} from "../repositories/pathfinder/PathfinderActionRepository";
import {PathfinderActionModel} from "../model/pathfinder/PathfinderActionModel";

@Service()
export class ActionService {
    private _actionRepository: PathfinderActionRepository;

    constructor() {
        this._actionRepository = new PathfinderActionRepository();
    }

    async create(data, include?: Includeable[]): Promise<PathfinderActionModel> {
        const actionFormValidator = new ActionForm();
        const validatedData = actionFormValidator.validate(data.action);
        if (validatedData) {
            const mapper = new ActionDataToModelMapper();
            const actionModel = mapper.map(validatedData);
            return this._actionRepository.create(actionModel);
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

    async findAll(include?: Includeable[]) {
        return PathfinderAction.findAll({include: include})
    }
}