const { Player, Card } = require("mongo");
const mockingoose = require("mockingoose").default;
const MockDiscord = require("tests/MockDiscord");
const fakePlayer = require("tests/fakePlayer");
const fakeCards = require("tests/fakeCards");

const collection = require("./collection");

describe("!collection commands", () => {
  let discord = new MockDiscord();
  fakePlayer.cards = [fakeCards[0]._id];
  fakeCards[0].asString = "TEST_STRING";
  mockingoose(Player).toReturn(fakePlayer, "findOne");
  mockingoose(Card).toReturn(fakeCards[0], "findOne");

  const HCards = fakeCards.map((c) => Card.hydrate(c));

  beforeEach(() => {
    discord = new MockDiscord();
    fakePlayer.markModified = jest.fn();
    fakePlayer.save = jest.fn();
  });

  it("should work", async () => {
    discord.mockMessage({ content: "!carte collection" });
    await collection(discord.message, fakePlayer);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toBe(`\n${HCards[0].asString}`);
  });

  it("should be sorted", async () => {
    fakePlayer.cards = fakeCards.map((c) => c._id);
    discord.mockMessage({ content: "!carte collection" });
    mockingoose(Card).toReturn((query) => {
      return HCards.find((c) => c._id.toString() === query.getQuery()._id);
    }, "findOne");
    await collection(discord.message, fakePlayer);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toBe(
      `\n{C} | Test Card | This is a test card\n{R} | Rare Card | This is a test card\n{L} | Legendary Card | This is a test card`
    );
  });

  it("should specify a 'times n' when the player has the same cart multiple times", async () => {
    fakePlayer.cards = [
      fakeCards[0]._id,
      fakeCards[0]._id,
      fakeCards[2]._id,
      fakeCards[1]._id,
      fakeCards[2]._id,
    ];
    discord.mockMessage({ content: "!carte collection" });
    mockingoose(Card).toReturn((query) => {
      return HCards.find((c) => c._id.toString() === query.getQuery()._id);
    }, "findOne");
    await collection(discord.message, fakePlayer);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toBe(
      `\n{C} | Test Card | This is a test card\tx2\n{R} | Rare Card | This is a test card\n{L} | Legendary Card | This is a test card\tx2`
    );
  });
});
