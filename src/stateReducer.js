export const ACTIONS = {
	ADD_ITEM: "ADD_ITEM",
	REMOVE_ITEM: "REMOVE_ITEM"
}

function reducer(state, action) {
	switch(action.type) {
		case ACTIONS.ADD_ITEM : {
			const itemId = action.payload;
			
			let newMenuItem = state.menu.find(item => item.id === itemId);
			newMenuItem = {...newMenuItem, qty: newMenuItem.qty + 1, isSelected: true}

			const newMenuItems = state.menu.map(item => item.id === itemId ? newMenuItem : item);
			
			const newState = {...state, menu: newMenuItems};

			return newState;
		};
		case ACTIONS.REMOVE_ITEM : {
			const itemId = action.payload;

			let newMenuItem = state.menu.find(item => item.id === itemId);

			if (newMenuItem.qty > 0) {
				newMenuItem.qty = newMenuItem.qty - 1
			}

			if (newMenuItem.qty === 0) {
				newMenuItem.isSelected = false;	
			}

			const newMenuItems = state.menu.map(item => item.id === itemId ? newMenuItem : item);
			const newState = {...state, menu: newMenuItems};

			return newState;
		}
	}
}

export default reducer;