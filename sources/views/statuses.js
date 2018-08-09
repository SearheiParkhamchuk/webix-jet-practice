import {JetView} from "webix-jet";
import {statuses} from "models/statuses";

export default class StatusesView extends JetView{
	config(){
		const form = {
			view:"form",
			cols:[
				{
					view:"text",
					name:"Name",
					placeholder:"Status Here",
					invalidMessage: "Field must be filled in.",
				},
				{
					view:"text",
					name:"Icon",
					placeholder:"Icon Name Here",
					invalidMessage: "Field must be filled in.",
				},
				{
					view:"button",
					localId:"save",
					label:"Save",
				}
			],
			rules: {
				Name: webix.rules.isNotEmpty,
				Icon: webix.rules.isNotEmpty,
			}

		};

		const table = {
			view:"datatable",
			editable:true,
			editaction:"dblclick",
			scroll:"auto",
			select:true,
			columns:[
				{ id:"Name",   header:"Status Name", fillspace:true, editor:"text", sort:"string"},
				{ id:"Icon",   header:"Icon Name", editor:"text", sort:"string"},
				{ id:"Delete", header:"", width:60, align:"center", template:"<span class='fa fa-trash delete-button jsDeleteBtn'></span>"}
			],
		};

		return {
			id:"statuses",
			rows:[
				table,
				form
			]
		};
	}

	ready(view){
		const table = view.queryView({ view:"datatable" });
		const form = view.queryView({ view:"form" });
		const saveBtn = this.$$("save");

		form.sync(statuses);

		form.bind(table);

		saveBtn.attachEvent("onItemClick", function(){
			if ( !form.validate() ) return false;

			let values = form.getValues();
			values.Name = values.Name.replace(/(\<(\/?[^>]+)>)/g, '');
			values.Icon = values.Icon.replace("/(\<(\/?[^>]+)>)/g, '');

			statuses.add(values);

			form.clearValidation();

			webix.message({
				text: "Genre successfully added.",
				type: "info",
				expire: 4000,
			});
		});
	}
}
