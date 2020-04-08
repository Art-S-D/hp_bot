const { Player, Card } = require("mongo");
const mockingoose = require("mockingoose").default;
const MockDiscord = require("tests/MockDiscord");
const _fakePlayer = require("tests/fakePlayer");
const fakeCards = require("tests/fakeCards");

const collection = require("./collection");

describe("!collection commands", () => {
  const fakePlayer = Player.hydrate(_fakePlayer);
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
    fakePlayer.cards.items = [HCards[0]];
    discord.mockMessage({ content: "!card collection" });
    await collection(discord.message, fakePlayer);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toBe(`cards\n${HCards[0].asString}\n---`);
  });

  it("should be sorted", async () => {
    fakePlayer.cards.items = fakeCards.map((c) => c._id);
    discord.mockMessage({ content: "!card collection" });
    mockingoose(Card).toReturn((query) => {
      return HCards.find((c) => c._id.toString() === query.getQuery()._id);
    }, "findOne");
    await collection(discord.message, fakePlayer);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toBe(
      `cards\n{C} | Test Card | This is a test card\n{R} | Rare Card | This is a test card\n{L} | Legendary Card | This is a test card\n---`
    );
  });

  it("should specify a 'times n' when the player has the same cart multiple times", async () => {
    fakePlayer.cards.items = [
      fakeCards[0]._id,
      fakeCards[0]._id,
      fakeCards[2]._id,
      fakeCards[1]._id,
      fakeCards[2]._id,
    ];
    discord.mockMessage({ content: "!card collection" });
    mockingoose(Card).toReturn((query) => {
      return HCards.find((c) => c._id.toString() === query.getQuery()._id);
    }, "findOne");
    await collection(discord.message, fakePlayer);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toBe(
      `cards\n{C} | Test Card | This is a test card\tx2\n{R} | Rare Card | This is a test card\n{L} | Legendary Card | This is a test card\tx2\n---`
    );
  });
});
