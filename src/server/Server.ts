import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import * as Path from "path";
import {join} from "path";

@ServerSettings({
    rootDir: Path.resolve(__dirname),
    httpPort: 4004,
    httpsPort: false,
    viewsDir: "${rootDir}/../view",
    acceptMimes: ["application/json"],
    mount: {
        "/V1": "${rootDir}/../api/V1/**/*Controller.ts"
    },
    componentsScan: ["${rootDir}/api/V1/Services/*Service.ts"],
    statics: {
        "/": join(__dirname, "..", "view/static"),
        "/build":join(__dirname,"..","..","build")
    },
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
            .use(bodyParser.json())
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