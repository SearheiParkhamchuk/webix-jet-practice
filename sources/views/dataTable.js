import {JetView} from "webix-jet";

export default class DataTable extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		const form = {
			view:"form",
			localId:"addForm",
			cols:[
				{
					view:"text",
					name:"Name",
					placeholder:_("Name"),
					invalidMessage:_("Field must be filled in."),
				},
				{
					view:"text",
					name:"Icon",
					placeholder:_("Icon Name"),
					invalidMessage:_("Field must be filled in."),
				},
				{
					view:"button",
					localId:"add",
					label:_("Add"),
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
				{ id:"Name",   header:_("Name"), fillspace:3, editor:"text", sort:"string"},
				{ id:"Icon",   header:_("Icon"), fillspace:1, editor:"text", sort:"string"},
				{ id:"Delete", header:"", width:60, align:"center", template:"<span class='fa fa-trash delete-button jsDeleteBtn'></span>"}
			],
		};

		return {
			rows:[
				table,
				form
			]
		};
	}

}
