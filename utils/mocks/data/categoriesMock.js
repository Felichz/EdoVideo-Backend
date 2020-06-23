const categoriesMock = [
    {
        name: 'Trends',
        videos: [
            {
                _id: '5eebd63d77910ba1d2e5f9f9',
            },
        ],
    },
    {
        name: 'Originals',
        videos: [],
    },
];

const badIdCategoryMock = [
    {
        name: 'Trends',
        videos: [
            {
                _id: '123',
            },
        ],
    },
];

module.exports = { categoriesMock, badIdCategoryMock };
