const { Player, Card } = require("mongo");
const mockingoose = require("mockingoose").default;
const MockDiscord = require("tests/MockDiscord");
const fakePlayer = require("tests/fakePlayer");
const fakeCard = require("tests/fakeCard");

const collectionCG = require("./collectionCG");

describe("!chocogrenouilles commands", () => {
  let discord = new MockDiscord();
  fakePlayer.cards = [fakeCard._id, fakeCard._id];
  fakeCard.asString = "TEST_STRING";
  mockingoose(Player).toReturn(fakePlayer, "findOne");
  mockingoose(Card).toReturn(fakeCard, "findOne");

  beforeEach(() => {
    discord = new MockDiscord();
    fakePlayer.markModified = jest.fn();
    fakePlayer.save = jest.fn();
  });

  it("should work", async () => {
    discord.mockMessage({ content: "!collectionCG" });
    await collectionCG(discord.message, fakePlayer);
    const HCard = Card.hydrate(fakeCard);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toBe(`\n${HCard.asString}\n${HCard.asString}`);
  });
});
