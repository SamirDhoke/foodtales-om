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
		};
		case ACTIONS.SHOW_SIDEBAR: {
			return {...state, showSidebar: true}
		};
		case ACTIONS.CLOSE_SIDEBAR: {
			return {...state, showSidebar: false}
		}
		case ACTIONS.TOGGLE_SIDEBAR: {
			return {...state, showSidebar: !state.showSidebar}
		};
		case ACTIONS.EDIT_ORDER: {

			const orderId = action.payload.orderId;
			const items = action.payload.items;

			const itemMap = items.reduce((itemMap, item) => {
				const curItemMap = {...itemMap, [item.id]: item}
				return curItemMap;
			}, {})

			console.log('itemMap', itemMap);

			const augamentedMenu = state.menu.map(item => {
				if (itemMap[item.id]) {
					return itemMap[item.id.toString()];
				} else {
					return item
				}
			})

			return {
				...state,
				orderId,
				showSidebar: false,
				isEditingOrder: true,
				menu: augamentedMenu
			}
		};
		case ACTIONS.UPDATE_ORDER : {
			const {
				orderId,
				items,
				total
			} = action.payload;

			let updatedOrder = state.orders.find(or => or.id === orderId);

			updatedOrder = {...updatedOrder, items, total: total, updated_time: Date.now()}

			const orders = state.orders.map(or => or.id === orderId ? updatedOrder : or);

			const initialMenu = state.menu.map(item => ({
				...item,
				qty: 0,
				isSelected: false
			}))

			const updatedState = {
				...state,
				orders,
				menu: initialMenu,
				isEditingOrder: false,
				orderId: null
			}

			// console.log('Updated order', updatedState);

			// return {
			// 	...state,
			// 	orders,
			// 	menu: initialMenu,
			// 	isEditingOrder: false,
			// 	orderId: null
			// }

			return updatedState;
		};
		case "UPDATE_ORDER_PAY" : {
			const orderId = action.payload.orderId;
			const order = state.orders.find(or => or.id === orderId);

			const updatedOrder = {...order, isPaid: true};

			const updatedOrders = state.orders.map(order => order.id === orderId ? updatedOrder : order);

			const initialMenu = state.menu.map(item => ({
				...item,
				qty: 0,
				isSelected: false
			}))

			const updatedState = {
				...state,
				orders: updatedOrders,
				menu: initialMenu,
				isEditingOrder: false,
				orderId: null
			}

			return updatedState;
		}
	}
}

export default reducer;