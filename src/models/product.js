const validTypes = ['Legume', 'Fruit', 'Miel', 'Oeuf'];

export default (sequelize, DataTypes) => {
	return sequelize.define('Product', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				msg: 'Un produit avec ce nom existe déjà.'
			},
			validate: {
				notEmpty: { msg: 'Votre produit doit avoir un nom.' },
				notNull: { msg: 'Votre produit doit avoir un nom.' }
			}
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
			validate: {
				isFloat: { msg: 'Le prix doit être un nombre décimal.'},
				notNull: { msg: 'Le produit doit avoir un prix.'},
				min: {
					args: [1],
					msg: 'Le prix doit être supérieur à zéro.'
				}
			}
		},
		types: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isTypesValid(value) {
					if(!value) {
						throw new Error('Le produit doit avoir un type.')
					}
					if(!validTypes. includes(type)) {
						throw new Error(`Le produit doit être de type ${validTypes}.`)
					}
				}
			}
		},
		picture: {
			type: DataTypes.STRING,
      validate: {
        isUrl: { msg: 'Le chemin de l\'image doit être une URL.'},
			}
		}
	}, {
		timestamps: true,
    createdAt: 'created',
    updatedAt: 'updated'
	})
}