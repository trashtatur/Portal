import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Scene} from "../Scene";

@Table
export class SceneScene extends Model<SceneScene> {

    @ForeignKey(()=> Scene)
    @Column({type:DataType.UUID})
    parentSceneId;

    @ForeignKey(()=> Scene)
    @Column({type:DataType.UUID})
    childSceneId;
}