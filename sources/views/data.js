import {JetView} from "webix-jet";
import CountriesView from "views/countries";
import StatusesView from "views/statuses";
import DataMenuView from "views/data_menu";

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
						DataMenuView,
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