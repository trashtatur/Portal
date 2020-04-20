import {AllowNull, BelongsToMany, Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";
import {Adventure} from "./Adventure";
import {AdventurePerson} from "./assocSchemas/AdventurePerson";
import {Scene} from "./Scene";
import {ScenePerson} from "./assocSchemas/ScenePerson";

@Table
export class Person extends Model<Person>{

    @PrimaryKey
    @Column({type: DataType.UUID, defaultValue: DataType.UUIDV4})
    uuid;

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    type: string;

    @AllowNull(false)
    @Column
    needs: string;

    @AllowNull(false)
    @Column
    desires: string;

    @AllowNull(false)
    @Column
    weaknesses: string;

    @AllowNull(false)
    @Column
    enemies: string;

    @AllowNull(true)
    @Column
    image: string;

    @AllowNull(true)
    @Column
    customFields: string;

    @AllowNull(true)
    @Column({type: DataType.TEXT({length: 'long'})})
    additionalDescription;

    @BelongsToMany(()=> Adventure, ()=> AdventurePerson)
    adventures: Adventure[];

    @BelongsToMany(()=> Scene, ()=> ScenePerson)
    scenes: Scene[];
}