const { Player, Card } = require("mongo");
const mockingoose = require("mockingoose").default;
const MockDiscord = require("tests/MockDiscord");
const fakePlayer = require("tests/fakePlayer");
const fakeCards = require("tests/fakeCards");

const chocogrenouilles = require("./chocogrenouilles");

describe("!chocogrenouilles commands", () => {
  let discord = new MockDiscord();
  fakePlayer.cards = [fakeCards[0]._id];
  fakeCards[0].asString = "TEST_STRING";
  mockingoose(Player).toReturn(fakePlayer, "findOne");
  mockingoose(Card).toReturn(fakeCards[0], "findOne");

  beforeEach(() => {
    discord = new MockDiscord();
    fakePlayer.markModified = jest.fn();
    fakePlayer.save = jest.fn();
  });

  it("should work", async () => {
    discord.mockMessage({ content: "!chocogrenouilles" });
    await chocogrenouilles(discord.message, fakePlayer);

    expect(fakePlayer.markModified).toBeCalled();
    expect(fakePlayer.save).toBeCalled();

    expect(fakePlayer.cards.length).toBe(2);
    expect(fakePlayer.cards[0]).toBe(fakeCards[0]._id);
    expect(fakePlayer.cards[1].toString()).toBe(fakeCards[0]._id);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toBe(Card.hydrate(fakeCards[0]).asString);
  });
});
