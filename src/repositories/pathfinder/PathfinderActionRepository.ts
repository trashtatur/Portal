import {PathfinderActionModel} from "../../model/pathfinder/PathfinderActionModel";
import {PathfinderAction} from "../../db/schemas/pathfinder/PathfinderAction";
import {EntityCreateException} from "../exception/EntityCreateException";
import {Service} from "@tsed/di";
import {PathfinderActionConverter} from "../../converter/pathfinder/PathfinderActionConverter";

@Service()
export class PathfinderActionRepository {
    private pathfinderActionConverter: PathfinderActionConverter;

    constructor(
        pathfinderActionConverter: PathfinderActionConverter
    ) {
        this.pathfinderActionConverter = pathfinderActionConverter;
    }

    async create(actionModel: PathfinderActionModel): Promise<PathfinderActionModel> {
        const action = await PathfinderAction.create(
            {
                name: actionModel.name,
                rangeType: actionModel.rangeType,
                attackBonus: actionModel.attackBonus,
                range: actionModel.range,
                magical: actionModel.damageTypes.isMagic,
                damage: actionModel.damage.getDamageString(),
                critMod: actionModel.critMod,
                damageType: actionModel.damageTypes.getDamageTypesString(),
                additionalInfo: actionModel.additionalInfo
            }
        );
        if (action) {
            return actionModel;
        }
        throw new EntityCreateException(`Action with name ${actionModel.name} could not be created`)
    }

    findAll = async(): Promise<PathfinderActionModel[]> => {
        const actions = await PathfinderAction.findAll();
        return actions.map(action => {
            return this.pathfinderActionConverter.convertEntity(action);
        });
    }
}