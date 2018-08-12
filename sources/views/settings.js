import {JetView} from "webix-jet";

export default class SettingsView extends JetView {
	config(){
		const _ = this.app.getService("locale")._;
		const lang = this.app.getService("locale").getLang();

		return {
			rows:[
				{
					template:_("<h1 class='h1'>Settings</h1>"),
					height:50,
					css:"sub-header"
				},
				{
					cols:[
						{
							view:"form",
							localId:"settings",
							borderless:true,
							elements:[
								{
									view:"combo",
									name:"lang",
									label:_("Language"),
									value:lang,
									options:[
										{id:"en", value:_("English")},
										{id:"ru", value:_("Russian")},
									],
									on:{
										onChange:() => {
											this.toggleLanguage();
										}
									}
								}
							],
							autoheight:false
						},
						{}
					]
				}
			]

		};
	}

	toggleLanguage(){
		const langs = this.app.getService("locale");
		const value = this.getRoot().queryView({ name:"lang" }).getValue();
		langs.setLang(value);
	}

	init(){

	}
}
