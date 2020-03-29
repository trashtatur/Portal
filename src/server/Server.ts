import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import * as Path from "path";
import {join} from "path";

@ServerSettings({
    rootDir: Path.resolve(__dirname),
    httpPort: 4004,
    httpsPort: false,
    viewsDir: "${rootDir}/../view",
    logger: {
        debug: true,
        logRequest: true,
        requestFields: ["reqId", "method", "url", "headers", "query", "params", "duration"]
    },
    mount: {
        "/V1": "${rootDir}/../api/V1/**/*Controller.ts"
    },
    componentsScan: ["${rootDir}/services/*Service.ts"],
    statics: {
        "/": join(__dirname, "..", "view/static"),
        "/build":join(__dirname,"..","..","build"),
        "/images":join(__dirname,"..","images")
    }
})
export class Server extends ServerLoader{

    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public $beforeRoutesInit(): void|Promise<any> {
        const cookieParser = require('cookie-parser'),
            bodyParser = require('body-parser'),
            compress = require('compression'),
            methodOverride = require('method-override');

        this.use(GlobalAcceptMimesMiddleware)
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