import {
	updateItemQty,
	updateMenuItemQty,
	setMenuFromOrder,
	generateId
} from './utils.js';

export const ACTIONS = {
	ADD_ITEM: "ADD_ITEM",
	REMOVE_ITEM: "REMOVE_ITEM",
	ADD_ORDER: "ADD_ORDER",
	SHOW_SIDEBAR: "SHOW_SIDEBAR",
	CLOSE_SIDEBAR: "CLOSE_SIDEBAR",
	TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
	EDIT_ORDER: "EDIT_ORDER",
	UPDATE_ORDER: "UPDATE_ORDER",
	UPDATE_ORDER_PAY: "UPDATE_ORDER_PAY"
}

function reducer(state, action) {
	switch(action.type) {
		case ACTIONS.ADD_ITEM : {
			const itemId = action.payload;
			const newMenu = updateMenuItemQty(state.menu, itemId, 1);			
			const newState = {
				...state, 
				menu: newMenu
			};

			return newState;
		};
		case ACTIONS.REMOVE_ITEM : {
			const itemId = action.payload;
			let newMenu = updateMenuItemQty(state.menu, itemId, -1)
			const newState = {
				...state, 
				menu: newMenu
			};

			return newState;
		};
		case ACTIONS.ADD_ORDER : {			

			if (!action.payload.items || !action.payload.items.length) {
				return {...state};
			}

			const time = Date.now();

			const order = {
				id: generateId(),
				created: time,
				modified: time,
				items: action.payload.items,
				total: action.payload.total,
				paid: false
			}

			const initialMenu = updateMenuItemQty(state.menu)

			return {
				...state,
				menu: initialMenu,
				orders: state.orders.concat(order)
			};
		};
		case ACTIONS.SHOW_SIDEBAR: {
			return {...state, sidebar: true}
		};
		case ACTIONS.CLOSE_SIDEBAR: {
			return {...state, sidebar: false}
		}
		case ACTIONS.TOGGLE_SIDEBAR: {
			return {...state, sidebar: !state.sidebar}
		};
		case ACTIONS.EDIT_ORDER: {
			
			const order = state.orders.find(ord => ord.id === action.payload.orderId);

			const augamentedMenu = setMenuFromOrder(order);

			return {
				...state,
				order,
				sidebar: false,
				menu: augamentedMenu
			}
		};
		case ACTIONS.UPDATE_ORDER : {
			const {
				orderId,
				items,
				total,
				paid=false
			} = action.payload;

			let updatedOrder = state.orders.find(or => or.id === orderId);

			updatedOrder = {
				...updatedOrder, 
				items, 
				total, 
				modified: Date.now(),
				paid
			}

			const orders = state.orders.map(o => o.id === orderId ? updatedOrder : o);

			const initialMenu = updateMenuItemQty(state.menu);

			const updatedState = {
				...state,
				orders,
				menu: initialMenu,			
				order: {
				    id: null,
				    items: [],
				    paid: false
	  			}
			}

			return updatedState;
		};
		default: return state;
	}
}

export default reducer;