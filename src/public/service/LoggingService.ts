import {LoggingSeverityEnum} from "@/public/model/enumeration/LoggingSeverityEnum";
import {HttpService} from "@/public/service/HttpService";
import {loggingContext} from "@/public/types/frontendTypes";

export class LoggingService {
    private httpService: HttpService = new HttpService()

    info = (message: string, context: loggingContext): void => {
        this.log(message, context, LoggingSeverityEnum.INFO);
    }

    debug = (message: string, context: loggingContext): void => {
        this.log(message, context, LoggingSeverityEnum.DEBUG);
    }

    warning = (message: string, context: loggingContext): void => {
        this.log(message, context, LoggingSeverityEnum.WARNING);
    }

    error = (message: string, context: loggingContext): void => {
        this.log(message, context, LoggingSeverityEnum.ERROR);
    }

    critical = (message: string, context: loggingContext): void => {
        this.log(message, context, LoggingSeverityEnum.CRITICAL);
    }

    private log = (message: string, context: loggingContext, severity: LoggingSeverityEnum): void => {
        this.httpService.post('/V1/log', {message: message, severity: severity, context: context})
    }
}