showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

enum PizzaSize {
    SMALL = 'Small',
    MEDIUM = 'Medium',
    LARGE = 'Large',
}

enum PizzaShape {
    ROUND = 'Round',
    SQUARE = 'square'
}

enum PizzaTopping {
    CHEESE = 'CheeseRegular',
    CHEESE_MOCARELLA = 'CheeseMocarella',
    CHEESE_GAUDA = 'CheeseGauda',
    CHEESE_DORBLUE = 'CheeseDorblue',
    BACON = 'Bacon',
    TOMATO = 'Tomato',
    MUSHROOMS = 'Mushrooms',
    PAPPERONI = 'Papperoni'
}

interface IPizzaBuilder<T> {
    setSize(size: PizzaSize): IPizzaBuilder<T>;
    setShape(shape: PizzaShape): IPizzaBuilder<T>;
    addTopping(topping: PizzaTopping): IPizzaBuilder<T>;
    build(): T;
    reset(): void;
}

class BasePizza {
    constructor(public size: PizzaSize, public shape: PizzaShape, public toppings: PizzaTopping[]) {}

    toString(): string {
        return `Size: ${this.size}, Shape: ${this.shape}, Toppings: ${this.toppings.join(', ')}`;
    }
}

class PizzaBuilder implements IPizzaBuilder<BasePizza> {
    private pizza!: BasePizza;

    constructor() {
        this.reset();
    }

    setSize(size: PizzaSize): IPizzaBuilder<BasePizza> {
        this.pizza.size = size;
        return this;
    }

    setShape(shape: PizzaShape): IPizzaBuilder<BasePizza> {
        this.pizza.shape = shape;
        return this;
    }

    addTopping(topping: PizzaTopping): IPizzaBuilder<BasePizza> {
        this.pizza.toppings.push(topping);
        return this;
    }

    build(): BasePizza {
        const builtPizza = this.pizza;
        this.reset();
        return builtPizza;
    }

    reset(): void {
        this.pizza = new BasePizza(PizzaSize.SMALL, PizzaShape.ROUND, []);
    }
}

class FourCheesePizzaBuilder implements IPizzaBuilder<BasePizza> {
    private pizza!: BasePizza;

    constructor() {
        this.reset();
    }

    reset(): void {
        this.pizza = new BasePizza(PizzaSize.MEDIUM, PizzaShape.ROUND, [PizzaTopping.CHEESE, PizzaTopping.CHEESE_MOCARELLA, PizzaTopping.CHEESE_GAUDA, PizzaTopping.CHEESE_DORBLUE]);
    }

    setSize(size: PizzaSize): IPizzaBuilder<BasePizza> {
        this.pizza.size = size;
        return this;
    }

    setShape(shape: PizzaShape): IPizzaBuilder<BasePizza> {
        this.pizza.shape = shape;
        return this;
    }

    addTopping(topping: PizzaTopping): IPizzaBuilder<BasePizza> {
        this.pizza.toppings.push(topping);
        return this;
    }

    build(): BasePizza {
        const pizza = this.pizza;
        this.reset();
        return pizza;
    }
}

class PepperoniPizzaBuilder implements IPizzaBuilder<BasePizza> {
    private pizza!: BasePizza;

    constructor() {
        this.reset();
    }

    reset(): void {
        this.pizza = new BasePizza(PizzaSize.MEDIUM, PizzaShape.ROUND, [PizzaTopping.PAPPERONI]);
    }

    setSize(size: PizzaSize): IPizzaBuilder<BasePizza> {
        this.pizza.size = size;
        return this;
    }

    setShape(shape: PizzaShape): IPizzaBuilder<BasePizza> {
        this.pizza.shape = shape;
        return this;
    }

    addTopping(topping: PizzaTopping): IPizzaBuilder<BasePizza> {
        this.pizza.toppings.push(topping);
        return this;
    }

    build(): BasePizza {
        const pizza = this.pizza;
        this.reset();
        return pizza;
    }
}

class PizzaDirector {
    constructor(private builder: IPizzaBuilder<BasePizza>) {}

    setBuilder(builder: IPizzaBuilder<BasePizza>): void {
        this.builder = builder;
    }

    createCustomPizza(size: PizzaSize, shape: PizzaShape, topping: PizzaTopping): BasePizza {
        return this.builder
            .setSize(size)
            .setShape(shape)
            .addTopping(topping)
            .build();
    }

    createFourCheesePizza(): BasePizza {
        if (!(this.builder instanceof FourCheesePizzaBuilder)) {
            throw new Error('Invalid builder for creating Four Cheese Pizza');
        }
        return this.builder.build();
    }

    createPepperoniPizza(): BasePizza {
        if (!(this.builder instanceof PepperoniPizzaBuilder)) {
            throw new Error('Invalid builder for creating Pepperoni Pizza');
        }
        return this.builder.build();
    }
}

const pizzaBuilder = new PizzaBuilder();
const fourCheesePizzaBuilder = new FourCheesePizzaBuilder();
const pepperoniPizzaBuilder = new PepperoniPizzaBuilder();

const director = new PizzaDirector(pizzaBuilder);

const customPizza = director.createCustomPizza(PizzaSize.LARGE, PizzaShape.SQUARE, PizzaTopping.BACON);
console.log('Custom pizza', customPizza.toString());

director.setBuilder(fourCheesePizzaBuilder);

const fourCheesePizza = director.createFourCheesePizza();
console.log('Four cheese pizza', fourCheesePizza.toString());

director.setBuilder(pepperoniPizzaBuilder);

const pepperoniPizza = director.createPepperoniPizza();
console.log('Pepperoni pizza', pepperoniPizza.toString());