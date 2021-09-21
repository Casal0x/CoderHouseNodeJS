export async function seed(knex) {
  const initProducts = [
    {
      title: 'Vacuna Covid 12',
      description: 'la vacuna mas vacuna',
      code: 'A4fGE4213',
      price: 32,
      thumbnail: 'https://randomimg.com',
      stock: 10,
    },
  ];
  return knex('products')
    .del()
    .then(() => knex('products').insert(initProducts));
}
