import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {Action} from "../db/schemas/Action";
import {ActionForm} from "../validation/ActionForm";
import {ActionModelMapper} from "../mapping/fromDataToModel/ActionModelMapper";
import {ActionRepository} from "../repositories/ActionRepository";
import {ActionModel} from "../model/ActionModel";

@Service()
export class ActionService {
    private _actionRepository: ActionRepository;

    constructor() {
        this._actionRepository = new ActionRepository();
    }

    async create(data, include?: Includeable[]): Promise<ActionModel> {
        const actionFormValidator = new ActionForm();
        const validatedData = actionFormValidator.validate(data.action);
        if (validatedData) {
            const mapper = new ActionModelMapper();
            const actionModel = mapper.map(validatedData);
            return this._actionRepository.create(actionModel);
        }
        return null;
    }

    async delete(data: object) {

    }

    async update(data: object, include?: Includeable[]) {

    }

    async findBy(key, value, include?: Includeable[]): Promise<Action[]> {
        const condition = {};
        const valueNew = value.map(elem => {
            return elem.name
        });
        condition[key] = valueNew;
        return Action.findAll(
            {where: condition, include: include});
    }

    async findOneBy(key, value, include?: Includeable[]) {

    }

    async findAll(include?: Includeable[]) {
        return Action.findAll({include: include})
    }
}