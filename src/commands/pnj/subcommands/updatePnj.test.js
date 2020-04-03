const { Player, Pnj } = require("mongo");
const mockingoose = require("mockingoose").default;
const MockDiscord = require("tests/MockDiscord");
const fakePlayer = require("tests/fakePlayer");
const fakePnj = require("tests/fakePnj");

const pnj = require("..");

describe("!pnj update command", () => {
  let discord = new MockDiscord();
  mockingoose(Player).toReturn(fakePlayer, "findOne");
  mockingoose(Pnj).toReturn(fakePnj, "findOne");
  mockingoose(Pnj).toReturn(true, "remove");

  beforeEach(() => {
    discord = new MockDiscord();
  });

  it("should fail when the pnj doesn't exists", async () => {
    discord.mockMessage({
      content: "!pnj update WrongPNJ[House.A+5] set name PNJ",
    });
    discord.message.attachments = [];
    discord.message.member = { roles: { array: () => [{ name: "MJ" }] } };

    try {
      await pnj(discord.message);
    } catch (e) {
      expect(e).toBe("Aucun pnj ne correspond à la description");
    }
  });

  it("should update a pnj", async () => {
    discord.mockMessage({
      content: "!pnj update Test[House.A+5] set name PNJ",
    });
    discord.message.attachments = [];
    discord.message.member = { roles: { array: () => [{ name: "MJ" }] } };

    const update = jest.fn();
    mockingoose(Pnj).toReturn(update, "update");
    await pnj(discord.message);

    //expect(update).toBeCalled();
    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toBe("Pnj modifié!");
  });
});
