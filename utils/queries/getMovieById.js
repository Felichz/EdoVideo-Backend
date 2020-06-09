const getVideoById = (data, id) => {
    let foundVideo = undefined;

    data.categories.find((category) => {
        return category.videos.find((video) => {
            if (video.id === parseInt(id)) {
                foundVideo = video;
                return true;
            }
        });
    });

    return foundVideo;
};

module.exports = getVideoById;
