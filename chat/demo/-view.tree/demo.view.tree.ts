namespace $ { export class $mol_chat_demo extends $mol_demo_small {

	/// title @ \Feed of comments for this page
	title() {
		return $mol_locale.text( "$mol_chat_demo_title" )
	}

	/// sub / <= Chat -
	sub() {
		return [].concat( this.Chat() )
	}

	/// Chat $mol_chat 
	/// 	repository_name \nin-jin/mol_chat
	/// 	title \$mol_chat_demo
	/// 	link <= chat_link -
	@ $mol_mem
	Chat() {
		return (( obj )=>{
			obj.repository_name = () => "nin-jin/mol_chat"
			obj.title = () => "$mol_chat_demo"
			obj.link = () => this.chat_link()
			return obj
		})( new this.$.$mol_chat )
	}

	/// chat_link \http://mol.js.org/#demo=mol_chat_demo
	chat_link() {
		return "http://mol.js.org/#demo=mol_chat_demo"
	}

} }

