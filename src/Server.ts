import {ServerLoader, ServerSettings} from "@tsed/common";
import * as Path from "path";

@ServerSettings({
    rootDir: Path.resolve(__dirname),
    httpPort: 4004,
    httpsPort: false,
    acceptMimes: ["application/json"],
    mount: {
        "/V1": [
            "${rootDir}/api/V1/**/*Controller.ts", // support ts entry
        ]
    },
    componentsScan: ["${rootDir}/api/V1/Services/*Service.ts"]
})
export class Server extends ServerLoader{

    /**
     * This method let you configure the middleware required by your application to works.
     * @returns {Server}
     */
    public $onMountingMiddlewares(): void|Promise<any> {

        const cookieParser = require('cookie-parser'),
            bodyParser = require('body-parser'),
            compress = require('compression'),
            methodOverride = require('method-override');


        this.use(cookieParser())
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