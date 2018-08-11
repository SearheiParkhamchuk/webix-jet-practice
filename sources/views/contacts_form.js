import {JetView} from "webix-jet";
import {statuses} from "models/statuses";
import {countries} from "models/countries";
import {contacts} from "models/contacts";

export default class ContactsFormView extends JetView{
	config(){
		return {

			view:"form",
			localId:"editForm",
			autoheight:false,
			padding: 50,
			css: "edit_form",
			elements:[
				{
					view:"text",
					label:"User Name",
					name:"Name",
					labelPosition:"top",
					invalidMessage:"Field `Name` must be filled."
				},
				{
					view:"text",
					label:"Email",
					name:"Email",
					labelPosition:"top",
					invalidMessage:"Field `Email` must be filled."
				},
				{
					view:"combo",
					name:"Country",
					label:"Country",
					labelPosition:"top",
					options:{
						body:{
							template:"#Name#",
							data:countries
						}
					},
				},
				{
					view:"combo",
					name:"Status",
					label:"Status",
					labelPosition:"top",
					options:{
						body:{
							template:"<span class='fa fa-#Icon#'></span> #Name#",
							data:statuses
						}
					},
				},
				{
					cols:[
						{
							view:"button",
							label:"Update",
							localId:"update",
							on:{
								onItemClick: function(){
									let form = this.$scope.getRoot();

									if ( !form.validate() )
										return false;

									let values = form.getValues();
									contacts.updateItem(values.id, values);
								}
							}
						},
						{
							view:"button",
							label:"Clear",
							localId:"clear",
							on:{
								onItemClick: function(){
									let form = this.$scope.getRoot(),
										id = this.$scope.getParam("id");

									form.clear();
									form.clearValidation();

									this.$scope.app.callEvent("unSelectAll", [id]);
								}
							}
						},
					]
				}
			],
			rules:{
				Name:webix.rules.isNotEmpty,
				Email:webix.rules.isNotEmpty,
			}

		};
	}

	init(view){
		this.on(this.app, "deleteItem", (dataId) => {
			if ( dataId ) {
				if ( view.getValues().id === +dataId )
					view.clear();
			}
		});

		this.on(this.app, "selectItem", () => {
			view.clearValidation();
		});
	}

	urlChange(view){
		let id = this.getParam("id", true);
		if ( id && contacts.exists(id) )
			view.setValues(contacts.getItem(id));
	}
}