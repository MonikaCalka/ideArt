import { Category } from './category';

export const CATEGORIES: Category[] = [
    {
        "id": 0,
        "name": "CATEGORY.HUMAN.TITLE",
        "state": false,
        "subcategories": [
            {
                "idCategory": 0,
                "idSubCategory": 0,
                "name": "COMMON.RANDOM_SUBCATEGORY",
                "tag": "human",
                "collectionId": undefined,
                "active": true
            },
            {
                "idCategory": 0,
                "idSubCategory": 1,
                "name": "CATEGORY.HUMAN.WOMAN",
                "tag": "woman",
                "collectionId": "21508598",
                "active": true
            },
            {
                "idCategory": 0,
                "idSubCategory": 2,
                "name": "CATEGORY.HUMAN.MAN",
                "tag": "man",
                "collectionId": "93931972",
                "active": true
            },
            {
                "idCategory": 0,
                "idSubCategory": 3,
                "name": "CATEGORY.HUMAN.KID",
                "tag": "kid",
                "collectionId": "51316515",
                "active": true
            }
        ]
    },
    {
        "id": 1,
        "name": "CATEGORY.ANIMAL.TITLE",
        "state": false,
        "subcategories": [
            {
                "idCategory": 1,
                "idSubCategory": 4,
                "name": "COMMON.RANDOM_SUBCATEGORY",
                "tag": "animal",
                "collectionId": undefined,
                "active": true
            },
            {
                "idCategory": 1,
                "idSubCategory": 5,
                "name": "CATEGORY.ANIMAL.CAT",
                "tag": "cat",
                "collectionId": "96878025",
                "active": true
            },
            {
                "idCategory": 1,
                "idSubCategory": 6,
                "name": "CATEGORY.ANIMAL.DOG",
                "tag": "dog",
                "collectionId": "42774580",
                "active": true
            }
        ]
    },
    {
        "id": 2,
        "name": "CATEGORY.VIEW.TITLE",
        "state": false,
        "subcategories": [
            {
                "idCategory": 2,
                "idSubCategory": 7,
                "name": "COMMON.RANDOM_SUBCATEGORY",
                "tag": "view",
                "collectionId": undefined,
                "active": true
            }
        ]
    }
];