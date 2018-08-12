import {JetView} from "webix-jet";
import ContactsListView from "views/contacts_list";
import ContactsFormView from "views/contacts_form";


export default class ContactsView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		return {
			cols:[
				{
					rows:[
						{
							template:_("<h1 class='h1'>Contacts</h1>"),
							height:50,
							css:"sub-header"
						},
						ContactsListView,
					]
				},
				ContactsFormView
			]

		};
	}

}