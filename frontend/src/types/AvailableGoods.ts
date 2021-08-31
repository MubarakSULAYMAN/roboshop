interface AvailableGoods {
  name: string;
  image: string;
  price: number;
  stock: number;
  createdAt: Date;
  material: string;
}

// type I2 = Person[keyof Person];

export default AvailableGoods;
