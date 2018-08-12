import {JetView, plugins} from "webix-jet";



export default class TopView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		let menu = {
			view:"menu",
			id:"top:menu",
			width:180,
			layout:"y",
			select:true,
			template:"<span class='webix_icon fa-#icon#'></span> #value# ",
			data:[
				{ value:_("Contacts"), id:"contacts", icon:"address-book" },
				{ value:_("Data"),		 id:"data",  icon:"file" },
				{ value:_("Settings"),	    id:"settings",  icon:"cog" },
			]
		};

		let ui = {
			type:"line",
			cols:[
				{
					type:"clean",
					css:"app-left-panel",
					padding:10,
					margin:20,
					borderless:true,
					rows: [ menu ]
				},
				{ rows:[
					{ height:10},
					{
						type:"clean",
						css:"app-right-panel",
						padding:4, rows:[
							{ $subview:true }
						]
					}
				]}
			]
		};


		return ui;
	}
	init(){
		this.use(plugins.Menu, "top:menu");
	}
}