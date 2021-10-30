module.exports = {
    apps: [
        {
            name: "discord",
            script: "yarn start",
        },
        { name: "adminMongo", script: "yarn --cwd adminMongo start" },
    ],
};
