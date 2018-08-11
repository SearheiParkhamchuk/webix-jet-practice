import {JetView} from "webix-jet";
import CountriesView from "views/countries";
import StatusesView from "views/statuses";

export default class DataView extends JetView{
	config(){
		return {
			rows:[
				{
					template:"<h1 class='h1'>Data</h1>",
					height:50,
					css:"sub-header"
				},
				{
					cols:[
						{
							view:"list",
							width: 300,
							template:"#value#",
							select:true,
							scroll:"auto",
							data:[
								{id:"statuses", value:"Statuses"},
								{id:"countries", value:"Countries"}
							]
						},
						{
							localId:"mult",
							animate:false,
							cells:[
								{id:"statuses", $subview:StatusesView},
								{id:"countries",$subview:CountriesView}
							]
						}
					]
				}
			]
		};
	}

	init(view){
		let list = view.queryView({view:"list"});

		this.on(list, "onAfterSelect", (id) => {
			view.queryView({id:id}).show();
			this.setParam("category", id, true);
		});

	}

	urlChange(view){
		let list = view.queryView({view:"list"});
		let id = this.getParam("category") || list.getFirstId();

		if ( id && list.exists(id) && id !== list.getSelectedId())
			list.select(id);
	}

}