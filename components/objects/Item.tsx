class Item {
    '_id': string;
    'itemType': string;
    'name': string;
    'title': string;
    'type': string;
    'description': string;
    'quantity': string;
    'unitType': string;
    'price': string;
    'salary': string;
    'city': string;
    'image': any;
    'imagePath': any

    // args[0] = item, args[1] = itemType
    constructor(...args: any[]) {

        if (args.length === 1) {
            this.itemType = args[0];
        }
        else if (args.length === 2) {
            // console.log('args[0] type: ', args[0].type)
            this.itemType = args[1];
            if (this.itemType === 'products') {
                this.name = args[0].name;
                this.type = args[0].type;
                this.description = args[0].description;
                this.price = args[0].price;
                this.quantity = args[0].quantity;
                this.unitType = args[0].unitType;
                this.city = args[0].city;
                if (args[0].imagePath !== undefined || args[0].imagePath !== '')
                    this.imagePath = args[0].imagePath;
            }
            else if (this.itemType === 'jobs') {
                this.title = args[0].title;
                this.type = args[0].type;
                this.description = args[0].description;
                this.salary = args[0].salary;
                this.unitType = args[0].unitType;
                this.city = args[0].city;
            }

            // Equipment
            else {
                this.title = args[0].title;
                this.type = args[0].type;
                this.description = args[0].description;
                this.price = args[0].price;
                this.unitType = args[0].unitType;
                this.city = args[0].city;
                if (args[0].imagePath !== undefined || args[0].imagePath !== '')
                    this.imagePath = args[0].imagePath;
            }
        }
        return this;
    }

    setItemType(itemType: any) {
        this.itemType = itemType;
        return this;
    }

    setName(name: any) {
        this.name = name;
        return this;
    }

    setTitle(title: any) {
        this.title = title;
        // console.log('title: ', this.title);
        return this;
    }
    setType(type: any) {
        if (this.itemType === 'product') {
            console.log('type: ', type);
            this.type = type;
        }

        // Equipment
        else {
            if (type === 'Tool')
                this.type = 'Tools';
            else if (type === 'Material')
                this.type = 'Materials';
            else
                this.type = type;
        }

        return this;
    }

    setDescription(description: any) {
        this.description = description;
        return this;
    }

    setQuantity(quantity: string) {
        this.quantity = quantity;
        return this;
    }

    setUnitType(unitType: any) {
        if (unitType === 'One-time')
            this.unitType = "one-time";
        else if (unitType === 'Hourly')
            this.unitType = 'hour';
        else if (unitType === 'Daily')
            this.unitType = 'day';
        else if (unitType === 'Weekly')
            this.unitType = 'week';
        else if (unitType === 'Monthly')
            this.unitType = 'month';
        else
            this.unitType = unitType;

        return this;
    }

    setPrice(price: string) {
        this.price = price;
        return this;
    }

    setSalary(salary: any) {
        this.salary = salary;
        return this;
    }

    setCity(city: any) {
        this.city = city;
        return this;
    }

    setImagePath(imagePath: any) {
        this.imagePath = imagePath;
        return this;
    }

    getTypes() {
        if (this.itemType === 'products')
            return (
                [
                    { label: 'Vegetable', value: '1' },
                    { label: 'Fruit', value: '2' },
                    { label: 'Nuts', value: '3' },
                    { label: 'Meat', value: '4' },
                    { label: 'Dairy', value: '5' },
                    { label: 'Grains', value: '6' },
                    { label: 'Baked Goods', value: '7' },
                    { label: 'Plants', value: '8' },
                    { label: 'Other', value: '9' },
                ]
            );
        else if (this.itemType === 'jobs')
            return (
                [
                    { label: 'Full-time', value: '1' },
                    { label: 'Part-time', value: '2' },
                    { label: 'Temporary', value: '3' },
                    { label: 'Any', value: '4' }
                ]
            );

        // Equipment
        else
            return (
                [
                    { label: 'Tool', value: '1' },
                    { label: 'Machinery', value: '2' },
                    { label: 'Material', value: '3' },
                    { label: 'Other', value: '4' }
                ]
            )
    }

    getUnitTypes() {
        if (this.itemType === 'jobs')
            return (
                [
                    { label: 'One-time', value: '1' },
                    { label: 'Hourly', value: '2' },
                    { label: 'Daily', value: '3' },
                    { label: 'Weekly', value: '4' },
                    { label: 'Monthly', value: '5' },
                ]
            );
        else
            return (
                [
                    { label: 'piece', value: '1' },
                    { label: 'lb', value: '2' },
                    { label: 'kg', value: '3' },
                    { label: 'g', value: '4' },
                    { label: 'hour', value: '5' },
                    { label: 'day', value: '6' },
                    { label: 'week', value: '7' },
                    { label: 'month', value: '8' }
                ]
            )
    }
}

export default Item;