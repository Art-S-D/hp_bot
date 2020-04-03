const { Player, Pnj } = require("mongo");
const mockingoose = require("mockingoose").default;
const MockDiscord = require("tests/MockDiscord");
const fakePlayer = require("tests/fakePlayer");
const fakePnj = require("tests/fakePnj");

const pnj = require("..");

describe("!pnj add command", () => {
  let discord = new MockDiscord();
  mockingoose(Player).toReturn(fakePlayer, "findOne");
  mockingoose(Pnj).toReturn(fakePnj, "findOne");
  mockingoose(Pnj).toReturn(true, "remove");

  beforeEach(() => {
    discord = new MockDiscord();
  });

  it("should fail when the pnj doesn't exists", async () => {
    discord.mockMessage({ content: "!pnj remove WrongPNJ[House.A+5]" });
    discord.message.attachments = [];
    discord.message.member = { roles: { array: () => [{ name: "MJ" }] } };

    try {
      await pnj(discord.message);
    } catch (e) {
      expect(e).toBe("Pnj inconnu");
    }
  });

  it("should remove a pnj", async () => {
    discord.mockMessage({ content: "!pnj remove Test[House.A+5]" });
    discord.message.attachments = [];
    discord.message.member = { roles: { array: () => [{ name: "MJ" }] } };

    const rm = jest.fn();
    mockingoose(Pnj).toReturn(rm, "remove");
    await pnj(discord.message);

    expect(rm).toBeCalled();
    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0].toBe("Pnj supprimé!"));
  });
});
