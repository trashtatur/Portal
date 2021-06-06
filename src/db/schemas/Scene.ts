import {
    AllowNull, BelongsTo,
    Column,
    DataType, ForeignKey,
    Model,
    PrimaryKey,
    Table, BelongsToMany
} from "sequelize-typescript";
import {Adventure} from "./Adventure";
import {Person} from "./Person";
import {ScenePerson} from "./assocSchemas/ScenePerson";

@Table
export class Scene extends Model {

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
    act: number;

    @AllowNull(true)
    @Column
    images: string;

    @AllowNull(true)
    @Column({type: DataType.TEXT({length: 'medium'})})
    parentScenes;

    @Column({type: DataType.TEXT({length: 'long'})})
    additionalDescription;

    @AllowNull(false)
    @Column({type: DataType.TEXT({length: 'long'})})
    resolve;

    @BelongsToMany(()=> Person, ()=> ScenePerson)
    persons: Person[];

    @BelongsTo(()=> Adventure)
    adventure: Adventure;
}
