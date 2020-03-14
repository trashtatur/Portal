import {Service} from "@tsed/di";
import {Includeable} from "sequelize";
import {Action} from "../db/schemas/Action";
import {ActionForm} from "../validation/ActionForm";
import {ActionModelMapper} from "../mapping/toEntity/ActionModelMapper";
import {ActionRepository} from "../repositories/ActionRepository";

@Service()
export class ActionService {
    private _actionRepository: ActionRepository;

    constructor() {
        this._actionRepository = new ActionRepository();
    }

    async create(data, include?: Includeable[]) {
        const actionFormValidator = new ActionForm();
        const validatedData = actionFormValidator.validate(data.action);
        if (validatedData) {
            const mapper = new ActionModelMapper();
            const actionModel = mapper.map(validatedData);
            return this._actionRepository.create(actionModel);
        }
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