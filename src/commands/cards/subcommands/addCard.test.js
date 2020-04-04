const { Player, Card } = require("mongo");
const mockingoose = require("mockingoose").default;
const fakePlayer = require("tests/fakePlayer");
const fakeCards = require("tests/fakeCards");

const addCard = require("./addCard");

describe("add card function", () => {
  fakePlayer.cards = [fakeCards[0]._id];
  fakeCards[0].asString = "TEST_STRING";
  mockingoose(Player).toReturn(fakePlayer, "findOne");
  mockingoose(Card).toReturn(fakeCards[0], "findOne");

  beforeEach(() => {
    fakePlayer.cards = [fakeCards[0]._id];
    fakePlayer.markModified = jest.fn();
    fakePlayer.save = jest.fn();
  });

  it("should work", async () => {
    const msg = { reply: jest.fn() };
    addCard(msg, fakePlayer, fakeCards[1]);

    expect(fakePlayer.markModified).toBeCalled();
    expect(fakePlayer.save).toBeCalled();
    expect(msg.reply).toBeCalled();

    expect(fakePlayer.cards.length).toBe(2);
    expect(fakePlayer.cards[0]).toBe(fakeCards[0]._id);
    expect(fakePlayer.cards[1].toString()).toBe(fakeCards[1]._id);
  });
});
