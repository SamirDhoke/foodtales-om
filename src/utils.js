export function updateItemQty(item, diff=0) {
	let newItem = { ...item, qty : item.qty + diff };
	
	const isSelected = newItem.qty > 0 ? true : false;

	newItem = { ...newItem, isSelected };

	return newItem;
}

export function updateMenuItemQty(menu, itemId=null, diff=0) {
	// in the ITEMS array, update the quantity of item with ITEM_ID to be the value gotten by
	// CURRENT_QTY + diff

	if (!itemId) { // if no 
		return menu.map(item => updateItemQty(item, item.qty * -1))
	}

	const item = menu.find(i => i.id === itemId);
	const newItem = updateItemQty(item, diff);

	return menu.map(i => i.id === itemId ? newItem : i);
}

export function setMenuFromOrder(menu, order) {

	const itemMap = order.items.reduce((itemMap, item) => {
		const curItemMap = {...itemMap, [item.id]: item}
		return curItemMap;
	}, {})

	const updatedMenu = menu.map(item => {
		if (itemMap[item.id]) {
			return itemMap[item.id.toString()];
		} else {
			return item
		}
	})

	return updatedMenu;
}

export function generateId() {
	return Math.floor( Math.random() * 1000 );
}