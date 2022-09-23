const sequelize = require('../config/connection');
const { Ingredient, Recipe, User } = require('../models');

const userData = require('./userData.json');
const ingredientData = require('./ingredientData.json');
const recipeData = require('./recipeData.json');
const recipeTagData = require('./recipeTagData.json');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const ingredient of ingredientData) {
        await Ingredient.create({
            ...ingredient,
        });
    }

    for (const recipe of recipeData) {
        await Recipe.create({
            ...recipe,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    for (const recipeTag of recipeTagData) {
        await recipeTag.create({
            ...recipeTag,
        });
    }

    process.exit(0);
};

seedDatabase();
