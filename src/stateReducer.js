export const ACTIONS = {
	ADD_ITEM: "ADD_ITEM",
	REMOVE_ITEM: "REMOVE_ITEM",
	ADD_ORDER: "ADD_ORDER"
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
		};
		case ACTIONS.ADD_ORDER : {
			const id = Math.floor( Math.random() * 1000 );
			const time = Date.now();
			// const items = state.menu.filter(item => item.isSelected);
			// const total = items.reduce((total, item) => {
			// 	return total + item.qty * item.price;
			// }, 0);

			if (!action.payload.items || !action.payload.items.length) {
				return {...state};
			}

			const order = {
				id,
				creation_time: time,
				items: action.payload.items,
				total: action.payload.total,
				isOpen: true
			}

			const initialMenu = state.menu.map(item => ({
				...item,
				qty: 0,
				isSelected: false
			}))

			return {
				...state,
				menu: initialMenu,
				orders: state.orders.concat(order)
			};
		}
	}
}

export default reducer;