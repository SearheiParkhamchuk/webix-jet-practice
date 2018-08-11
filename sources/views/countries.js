import {JetView} from "webix-jet";
import {countries} from "models/countries";

export default class CountriesView extends JetView{
	config(){
		const table = {
			view:"datatable",
			editable:true,
			editaction:"dblclick",
			scrollX:false,
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
					invalidMessage:"Field `Country` must be filled."
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
							countries.add({
								Name:values.country
							});
						}
					}
				}
			],
			rules:{
				country:webix.rules.isNotEmpty
			}
		};

		return {
			id:"countries",
			rows:[
				table,
				form
			]
		};
	}

	deleteItem(e, id){
		webix.confirm({
			title: "Delete",
			text: "Delete this country?",
			type:"confirm-warning",
			callback:function(result){
				if ( result ) {
					countries.remove(id);

					webix.message({
						type:"info",
						text:"Country successfully removed."
					});
				}
			}
		});
	}

	init(view){
		let datatable = view.queryView({view:"datatable"});

		datatable.sync(countries);
		datatable.on_click.jsDeleteBtn = this.deleteItem;
	}
}
