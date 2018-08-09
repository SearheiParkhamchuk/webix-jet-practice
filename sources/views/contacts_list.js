import {JetView} from "webix-jet";
import {contacts} from "models/contacts";

export default class ContactsListView extends JetView{
	config(){
		return  {
			view: "list",
			id:"contactList",
			width:300,
			scroll:"auto",
			select:true,
			css:"contact-list",
			template: "<div class='contact'><div class='contact-name'>#Name#.</div><div class='contact-email'>#Email#</div></div>" +
			"<div class='contact-delete delete-button'><span class='fa fa-times'></span></div>",
			type: {
				height:65
			}
		};
	}

	init(view){
		view.parse(contacts);
	}

}