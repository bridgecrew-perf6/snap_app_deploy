use scoreboard;
db.dropDatabase();

db.players.insertMany([
    {
        "name": "Slap",
        "score": 10000
    },
    {
        "name": "Jack",
        "score": 52
    },
    {
        "name": "Frank",
        "score": 100000
    },
    {
        "name": "Jeremiah",
        "score": 6
    },
    {
        "name": "Lesley",
        "score": 890
    },
    {
        "name": "Suzie",
        "score": 3200
    },
    {
        "name": "Geraldine",
        "score": 650
    },
    {
        "name": "Julio",
        "score": 17
    },
    {
        "name": "Tracy",
        "score": 1000
    },
    {
        "name": "Uda",
        "score": 5200
    }
]);