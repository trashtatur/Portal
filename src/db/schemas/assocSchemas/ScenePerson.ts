import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Scene} from "../Scene";
import {Person} from "../Person";

@Table({ tableName: 'ScenePersons'})
export class ScenePerson extends Model<ScenePerson> {

    @ForeignKey(()=> Scene)
    @Column({type:DataType.UUID})
    sceneId;

    @ForeignKey(()=> Person)
    @Column({type:DataType.UUID})
    personId;
}