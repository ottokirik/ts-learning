abstract class DeliveryItem {
	protected items: DeliveryItem[] = [];

	addItem(item: DeliveryItem) {
		this.items.push(item);
	}

	protected getItemsCost(): number {
		return this.items.reduce((sum, item) => sum + item.getCost(), 0);
	}

	abstract getCost(): number;
}

class DeliveryShop extends DeliveryItem {
	constructor(private deliveryFee: number) {
		super();
	}

	getCost(): number {
		return this.getItemsCost() + this.deliveryFee;
	}
}

class Package extends DeliveryItem {
	getCost(): number {
		return this.getItemsCost();
	}
}

class Product extends DeliveryItem {
	constructor(private price: number) {
		super();
	}

	getCost(): number {
		return this.price;
	}
}

const shop = new DeliveryShop(100);
const packageOne = new Package();
packageOne.addItem(new Product(1000));
packageOne.addItem(new Product(2000));

const packageTwo = new Package();
packageTwo.addItem(new Product(300));

const packageThree = new Package();
packageThree.addItem(packageOne);
packageThree.addItem(packageTwo);

shop.addItem(packageThree);
shop.addItem(new Product(500));

console.log(shop.getCost());
