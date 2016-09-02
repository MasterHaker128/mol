module $.$mol {
	export class $mol_decker extends $.$mol_decker {
		
		@ $mol_prop()
		current( ...diff : string[] ) {
			return diff[0] || '0'
		}
		
		@ $mol_prop()
		switcher() {
			return new $mol_switcher().setup( obj => {
				obj.value = ( ...diff )=> this.current( ...diff )
				obj.option_keys = ()=> this.items().map( ( item , index )=> String( index ) )
				obj.option = ( key : string )=> this.items()[ key ].title()
			} )
		}
		
		@ $mol_prop()
		content() {
			return this.items()[ this.current() ].content()
		}
		
	}
}