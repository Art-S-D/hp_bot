const { Player, Card } = require("../../models");
const mockingoose = require("mockingoose").default;
const MockDiscord = require("../../tests/MockDiscord");
const fakePlayer = require("../../tests/fakePlayer");
const fakeCard = require("../../tests/fakeCard");

const collectionCG = require("./collectionCG");

describe("!chocogrenouilles commands", () => {
  let discord = new MockDiscord({ guild: { id: require("../serverId") } });
  fakePlayer.cards = [fakeCard._id, fakeCard._id];
  fakeCard.asString = "TEST_STRING";
  mockingoose(Player).toReturn(fakePlayer, "findOne");
  mockingoose(Card).toReturn(fakeCard, "findOne");

  beforeEach(() => {
    discord = new MockDiscord({ guild: { id: require("../serverId") } });
    fakePlayer.markModified = jest.fn();
    fakePlayer.save = jest.fn();
  });

  it("should fail when the server is not authorised", async () => {
    discord = new MockDiscord({ guild: { id: "INVALID_ID" } });
    discord.mockMessage({ content: "!chocogrenouilles" });
    await collectionCG(discord.message, fakePlayer);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toBe("Unauthorised");
  });

  it("should work", async () => {
    discord.mockMessage({ content: "!collectionCG" });
    await collectionCG(discord.message, fakePlayer);
    const HCard = Card.hydrate(fakeCard);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toBe(`${HCard.asString}\n${HCard.asString}`);
  });
});
