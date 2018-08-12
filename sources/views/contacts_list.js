import {JetView} from "webix-jet";
import {contacts} from "models/contacts";

export default class ContactsListView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;

		const list = {
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
			}
		};

		const btn = {
			view:"button",
			value:_("Add Contact"),
			localId:"add_contact"
		};

		return {
			rows:[
				list,
				btn
			]
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
		let list = view.queryView({view:"list"});
		let addBtn = view.queryView({localId:"add_contact"});
		list.sync(contacts);
		list.on_click.js_delete_btn = this.deleteItem;

		this.on(this.app, "unSelectAll", (dataId) => {
			if ( dataId ) {
				list.unselect(dataId);
			}
		});

		this.on(list, "onAfterSelect", (id) => {
			webix.delay(()=>{
				this.show("contacts?id="+id);
				this.app.callEvent("selectItem");
			});
		});

		this.on(addBtn, "onItemClick", () => {
			let countCOllection = contacts.count(),
				randomItem = Math.round(Math.random() * countCOllection),
				itemId =  contacts.getIdByIndex(randomItem);

			contacts.copy(itemId, countCOllection + 1, contacts, {id:webix.uid()});

			let lastId = list.getLastId();
			list.select(lastId);
			list.showItem(lastId);
		});
	}

	urlChange(view){
		let list = view.queryView({view:"list"});

		let id = this.getParam("id") || contacts.getFirstId();
		if ( id && contacts.exists(id) && id !== list.getSelectedId())
			list.select(id);
	}

}