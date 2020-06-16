import {EffectCollection} from "@/public/model/effects/EffectCollection";
import {BooleanEffect} from "@/public/model/effects/BooleanEffect";
import {HttpService} from "@/public/service/HttpService";

export class AbstractEffectViewModel {
   private _effects: EffectCollection = new EffectCollection([])
   private httpService: HttpService = new HttpService();
    constructor(
    ) {
       this.fetchEffects(this['__proto__'])
    }

    private fetchEffects = async (callingClass): Promise<void> => {
       const name = callingClass.constructor.name;
       const effectsData = await this.httpService.get(`/V1/effect/${name}`);
       console.log(effectsData);
       this._effects = new EffectCollection([new BooleanEffect(false, 'value')])
    }

    get effects(): EffectCollection {
        return this._effects;
    }

    set effects(value: EffectCollection) {
        this._effects = value;
    }
}