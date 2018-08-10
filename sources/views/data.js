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
							localId:"statusesList",
							view:"list",
							width: 300,
							template:"#value#",
							select:true,
							scroll:"auto",
							data:[
								{id:"statuses", value:"Statuses"},
								{id:"countries", value:"Countries"}
							],
							on:{
								onItemClick:function(id){
									this.$scope.app.webix.$$(id).show();
								}
							}
						},
						{cells:[
							{$subview:CountriesView},
							{$subview:StatusesView},
						]}
					]
				}
			]
		};
	}
}