import { PizzaBuilder, PizzaSize, PizzaShape, PizzaTopping } from './app';

describe('PizzaBuilder', () => {
    let pizzaBuilder: PizzaBuilder;

    beforeEach(() => {
        pizzaBuilder = new PizzaBuilder();
    });

    it('should build a pizza with default values', () => {
        const pizza = pizzaBuilder.build();
        expect(pizza.size).toBe(PizzaSize.SMALL);
        expect(pizza.shape).toBe(PizzaShape.ROUND);
        expect(pizza.toppings).toEqual([]);
    });

    it('should set size correctly', () => {
        const pizza = pizzaBuilder.setSize(PizzaSize.LARGE).build();
        expect(pizza.size).toBe(PizzaSize.LARGE);
    });

    it('should set shape correctly', () => {
        const pizza = pizzaBuilder.setShape(PizzaShape.SQUARE).build();
        expect(pizza.shape).toBe(PizzaShape.SQUARE);
    });

    it('should add toppings correctly', () => {
        const pizza = pizzaBuilder
            .addTopping(PizzaTopping.CHEESE)
            .addTopping(PizzaTopping.PAPPERONI)
            .build();
        expect(pizza.toppings).toEqual([PizzaTopping.CHEESE, PizzaTopping.PAPPERONI]);
    });

    it('should reset correctly', () => {
        const pizza = pizzaBuilder
            .setSize(PizzaSize.LARGE)
            .setShape(PizzaShape.SQUARE)
            .addTopping(PizzaTopping.CHEESE)
            .reset();

        const resetPizza = pizzaBuilder.build();

        expect(resetPizza.size).toBe(PizzaSize.SMALL);
        expect(resetPizza.shape).toBe(PizzaShape.ROUND);
        expect(resetPizza.toppings).toEqual([]);
    });
});