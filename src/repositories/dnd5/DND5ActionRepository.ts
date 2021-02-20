import {Service} from "@tsed/di";
import {DND5ActionModel} from "../../model/dnd5/DND5ActionModel";
import {DND5ActionConverter} from "../../converter/dnd5/DND5ActionConverter";
import {DND5Action} from "../../db/schemas/DND5/DND5Action";

@Service()
export class DND5ActionRepository {
    private dnd5ActionConverter: DND5ActionConverter;

    constructor(
        dnd5ActionConverter: DND5ActionConverter
    ) {
        this.dnd5ActionConverter = dnd5ActionConverter;
    }

    create = async(dnd5ActionModel: DND5ActionModel): Promise<DND5ActionModel> => {
        const entity = await DND5Action.create({
            name: dnd5ActionModel.name,
            rangeType: dnd5ActionModel.rangeType,
            attackBonus: dnd5ActionModel.attackBonus,
            range: dnd5ActionModel.range,
            magical: dnd5ActionModel.magical,
            damage: dnd5ActionModel.damage.getDamageString(),
            damageType: dnd5ActionModel.damageType.damageTypes.join(','),
            additionalInfo: dnd5ActionModel.additionalInfo
        });
        return this.dnd5ActionConverter.convertEntity(entity);
    }

    bulkCreate = async(dnd5ActionModels: DND5ActionModel[]): Promise<DND5ActionModel[]> => {
        return null;
    }

    delete = async(id: string): Promise<boolean> => {
        const destroyed = await DND5Action.destroy({where: { uuid: id}});
        return destroyed > 0;
    }

    update = async(dnD5ActionModel: DND5ActionModel): Promise<DND5ActionModel> => {
        return null;
    }

    findOneBy = async(key, value): Promise<DND5ActionModel> => {
        const condition = {};
        condition[key] = value;
        const entity = await DND5Action.findOne({where: condition});
        return this.dnd5ActionConverter.convertEntity(entity);
    }

    findAll = async(): Promise<DND5ActionModel[]> => {
        const entities = await DND5Action.findAll();
        return this.dnd5ActionConverter.convertMultipleEntities(entities);
    }
}