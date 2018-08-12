import "./styles/app.css";
import {JetApp, EmptyRouter, HashRouter, plugins} from "webix-jet";

export default class MyApp extends JetApp{
	constructor(config){
		const defaults = {
			id 		: APPNAME,
			version : VERSION,
			router 	: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug 	: true,
			start 	: "/top/contacts"
		};

		super({ ...defaults, ...config });
	}
}

let myApp = new MyApp();
myApp.use(plugins.Locale,{lang:"ru"});
myApp.use(plugins.Locale, { storage:webix.storage.local });

if (!BUILD_AS_MODULE){
	webix.ready(() => myApp.render() );
}

