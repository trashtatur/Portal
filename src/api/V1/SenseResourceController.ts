import {Controller} from "@tsed/common";
import {SenseService} from "./Services/SenseService";

@Controller('/sense')
export class SenseResourceController {

    constructor(private readonly senseService:SenseService) {

    }
}