inventoryQueue.find((item) => {
  if (item[0].ingredient_id == checkid) {
    setPrev(0);
    console.log(item);
    console.log(askQuantity);
    return (item[0].askQuantity = askQuantity);
  } else {
    return item;
  }
});
singleQueue.push({
  ingredient_name: data.ingredient,
  ingredient_id: data.ingredient_id,
  unit: data.unit,
  askQuantity: askQuantity,
});
}
setInventoryQueue((state) => [...state, singleQueue]);
setAskQuantity(0);
setPrev(0);