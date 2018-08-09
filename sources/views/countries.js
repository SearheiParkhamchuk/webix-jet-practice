import {JetView} from "webix-jet";
import {countries} from "models/countries";

export default class CountriesView extends JetView{
	config(){
		const table = {
			localId:"tableId",
			view:"datatable",
			editable:true,
			editaction:"dblclick",
			scroll:"auto",
			select:true,
			columns:[
				{ id:"Name",   header:"Country", fillspace:true, editor:"text", sort:"string"},
				{ id:"Delete", header:"", width:60, align:"center", template:"<span class='fa fa-trash delete-button jsDeleteBtn'></span>"}
			],
		};

		const form = {
			localId:"formId",
			view:"form",
			cols:[
				{
					view:"text",
					name:"country",
					placeholder:"Country Here"
				},
				{
					view:"button",
					localId:"save",
					label:"Save"
				}
			]
		};

		return {
			id:"countries",
			rows:[
				table,
				form
			]
		};
	}

	init(view){
		view.queryView({view:"datatable"}).parse(countries);
		// this.$$("tableId").bind("formId");
	}
}
