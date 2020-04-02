const { Player, Card } = require("../../models");
const mockingoose = require("mockingoose").default;
const MockDiscord = require("../../tests/MockDiscord");
const fakePlayer = require("../../tests/fakePlayer");
const fakeCard = require("../../tests/fakeCard");

const chocogrenouilles = require("./chocogrenouilles");

describe("!chocogrenouilles commands", () => {
  let discord = new MockDiscord({ guild: { id: require("../serverId") } });
  fakePlayer.cards = [fakeCard._id];
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
    await chocogrenouilles(discord.message, fakePlayer);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toBe("Unauthorised");
  });
  it("should work", async () => {
    discord.mockMessage({ content: "!chocogrenouilles" });
    await chocogrenouilles(discord.message, fakePlayer);

    expect(fakePlayer.markModified).toBeCalled();
    expect(fakePlayer.save).toBeCalled();

    expect(fakePlayer.cards.length).toBe(2);
    expect(fakePlayer.cards[0]).toBe(fakeCard._id);
    expect(fakePlayer.cards[1].toString()).toBe(fakeCard._id);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toBe(Card.hydrate(fakeCard).asString);
  });
});
