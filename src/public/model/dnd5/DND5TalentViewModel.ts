export class DND5TalentViewModel {
    private _id: string;
    private _name: string;
    private _condition: string;
    private _benefit: string;

    constructor(
        id: string,
        name: string,
        condition: string,
        benefit: string
    ) {
        this._id = id;
        this._name = name;
        this._condition = condition;
        this._benefit = benefit;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get condition(): string {
        return this._condition;
    }

    set condition(value: string) {
        this._condition = value;
    }

    get benefit(): string {
        return this._benefit;
    }

    set benefit(value: string) {
        this._benefit = value;
    }
}