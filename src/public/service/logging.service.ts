import {LoggingSeverityEnum} from "@/public/model/enumeration/LoggingSeverityEnum";
import {httpPost} from "@/public/service/http.service";
import {loggingContext} from "@/public/types/frontendTypes";

const log = (message: string, context: loggingContext, severity: LoggingSeverityEnum): void => {
    httpPost('/V1/log', {message: message, severity: severity, context: context})
}

export const info = (message: string, context: loggingContext): void =>  log(message, context, LoggingSeverityEnum.INFO);

export const debug = (message: string, context: loggingContext): void => log(message, context, LoggingSeverityEnum.DEBUG);

export const warning = (message: string, context: loggingContext): void => log(message, context, LoggingSeverityEnum.WARNING);

export const error = (message: string, context: loggingContext): void => log(message, context, LoggingSeverityEnum.ERROR);

export const critical = (message: string, context: loggingContext): void => log(message, context, LoggingSeverityEnum.CRITICAL);



