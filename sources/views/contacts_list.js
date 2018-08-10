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
			"<div class='contact-delete delete-button js_delete_btn'><span class='fa fa-times'></span></div>",
			type: {
				height:65
			},
			on:{
				onItemClick:function(id){
					this.$scope.show("contacts?id=" + id);
					this.$scope.app.callEvent("selectItem");
				},
			},
		};
	}

	deleteItem(e, id) {
		let that = this;

		webix.confirm({
			title: "Delete",
			text: "Delete this contact?",
			type:"confirm-warning",
			callback:function(result){
				if ( result ) {
					contacts.remove(id);

					that.$scope.app.callEvent("deleteItem", [id]);

					webix.message({
						type:"info",
						text:"Contact successfully removed."
					});
				}
			}
		});
	}

	init(view){
		view.sync(contacts);
		view.on_click.js_delete_btn = this.deleteItem;

		let id = this.getParam("id");
		if ( id && view.exists(id)) {
			view.select(id);
		} else {
			view.select(view.getFirstId());
			this.setParam("id", "1", true);
		}


		this.on(this.app, "unSelectAll", (dataId) => {
			if ( dataId ) {
				view.unselect(dataId);
			}
		});
	}

}