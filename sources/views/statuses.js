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
					localId:"add",
					label:"Add",
					on:{
						onItemClick:function(){
							let form = this.getParentView();

							if ( !form.validate() )
								return false;

							let values = form.getValues();
							statuses.add(values);
						}
					}
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

	deleteItem(e, id){
		webix.confirm({
			title: "Delete",
			text: "Delete this status?",
			type:"confirm-warning",
			callback:function(result){
				if ( result ) {
					statuses.remove(id);

					webix.message({
						type:"info",
						text:"Status successfully removed."
					});
				}
			}
		});
	}

	init(view){
		let datatable = view.queryView({view:"datatable"});

		datatable.sync(statuses);
		datatable.on_click.jsDeleteBtn = this.deleteItem;
	}
}
