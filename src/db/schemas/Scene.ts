import {
    AllowNull, BelongsTo,
    Column,
    DataType, ForeignKey,
    Model,
    PrimaryKey,
    Table, BelongsToMany
} from "sequelize-typescript";
import {Adventure} from "./Adventure";
import {SceneScene} from "./assocSchemas/SceneScene";

@Table
export class Scene extends Model<Scene> {

    @PrimaryKey
    @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid: string;

    @ForeignKey(()=>Adventure)
    @Column({type: DataType.UUID})
    adventureId;

    @AllowNull(false)
    @Column
    number: number;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column({type: DataType.TEXT({length: 'long'})})
    hook;

    @AllowNull(false)
    @Column({type: DataType.TEXT({length: 'long'})})
    token;

    @AllowNull(true)
    @Column
    treasure: string;

    @AllowNull(false)
    @Column
    act: string;

    @AllowNull(true)
    @Column
    images: string;

    @Column({type: DataType.TEXT({length: 'long'})})
    additionalDescription;

    @AllowNull(false)
    @Column({type: DataType.TEXT({length: 'long'})})
    resolve;

    @BelongsToMany(()=> Scene, ()=>SceneScene, 'parentSceneId')
    parentScenes: Scene[];

    @BelongsToMany(()=> Scene, ()=>SceneScene, 'childSceneId')
    childScenes: Scene[];

    @BelongsTo(()=> Adventure)
    adventure: Adventure;
}
