module.exports = {
    apps: [
        {
            name: "discord",
            script: "yarn start",
            watch: true,
        },
        { name: "adminMongo", script: "yarn --cwd adminMongo start" },
    ],
};
