require('dotenv').config();
const db = require('./models');

async function seedDefaultData() {
  try {
    await db.admin.findOrCreate({
      where: { email: 'admin@flowershop.com' },
      defaults: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@flowershop.com',
        password: 'admin123'
      }
    });

    const defaultFlowers = [
      {
        title: 'Red Roses',
        description: 'Fresh red roses for romance and celebrations.',
        imageUrl: 'https://www.pampaskoning.com/cdn/shop/files/red-rose-9161355.webp?v=1778491756&width=600',
        amount: 20,
        price: 25,
        status: 'available'
      },
      {
        title: 'White Lilies',
        description: 'Pure white lilies for sympathy or special moments.',
        imageUrl: 'https://cdn.shopify.com/s/files/1/2776/7900/files/ashlee-marie-BgZpymlK1-A-unsplash.jpg?v=1760345590',
        amount: 15,
        price: 30,
        status: 'available'
      },
      {
        title: 'Pink Tulip Bouquet',
        description: 'Soft pink tulip bouquet to brighten any room.',
        imageUrl: 'https://www.bunchesbaskets.jp/product_image/1352.jpg',
        amount: 12,
        price: 20,
        status: 'available'
      },
      {
        title: 'Sunflower Bouquet',
        description: 'A cheerful bouquet of sunflowers for a happy day.',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxZ2UenP2MHD4j9pQ1geDPUIDxNOTSixmjQcM_vFhmJoy9SK26sD4acsMg&s=10',
        amount: 10,
        price: 35,
        status: 'available'
      }
    ];

    for (const flower of defaultFlowers) {
      await db.flower.findOrCreate({
        where: { title: flower.title },
        defaults: flower
      });
    }

    console.log('Default seed data has been applied.');
  } catch (error) {
    console.error('Seed error:', error.message);
  }
}

if (require.main === module) {
  db.sequelize.sync({ alter: true })
    .then(() => seedDefaultData())
    .catch((err) => console.error('Seed startup error:', err.message));
}

module.exports = { seedDefaultData };