import {JetView} from "webix-jet";

export default class ContactsFormView extends JetView{
	config(){
		return {

			view:"form",
			autoheight:false,
			padding: 50,
			css: "edit_form",
			elements:[
				{
					view:"text",
					name:"username",
					label:"User Name",
					labelPosition:"top"
				},
				{
					view:"text",
					label:"Email",
					name:"email",
					labelPosition:"top"
				},
				{
					view:"combo",
					name:"country",
					label:"Country",
					labelPosition:"top"
				},
				{
					view:"combo",
					name:"status",
					label:"Status",
					labelPosition:"top"
				},
				{
					cols:[
						{},
						{
							view:"button",
							label:"Save",
							localId:"save"
						},
					]
				}
			]

		};
	}
}