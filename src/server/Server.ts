import {
    Inject,
    Configuration,
    PlatformApplication,
    PlatformAcceptMimesMiddleware
} from "@tsed/common";
import * as Path from "path";
import {join} from "path";

@Configuration({
    rootDir: Path.resolve(__dirname),
    httpPort: 4004,
    httpsPort: false,
    viewsDir: "${rootDir}/../public/view",
    logger: {
        debug: true,
        logRequest: true,
        requestFields: ["reqId", "method", "url", "headers", "query", "params", "duration"]
    },
    mount: {
        "/V1": "${rootDir}/../api/V1/**/*Controller.ts"
    },
    componentsScan: [
        "${rootDir}/services/*Service.ts",
        "${rootDir}/mapping/**/*Mapper.ts",
        "${rootDir}/repositories/**/*Repository.ts",
    ],
    statics: {
        "/": join(__dirname, "..","..", "public/view/static"),
        "/build":join(__dirname,"..","..","build"),
        "/images":join(__dirname,"..","..","public","images")
    }
})
export class Server {
    @Inject()
    app: PlatformApplication;

    @Configuration()
    settings: Configuration;

    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public $beforeRoutesInit(): void|Promise<any> {
        const cookieParser = require('cookie-parser'),
            bodyParser = require('body-parser'),
            compress = require('compression'),
            methodOverride = require('method-override');

        this.app.use(PlatformAcceptMimesMiddleware)
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json({limit: '10mb', extended: true}))
            .use(bodyParser.urlencoded({
                extended: true
            }));

        return null;
    }

    public $onReady(){
        console.log('Server started');
    }

    public $onServerInitError(err){
        console.error(err);
    }

}