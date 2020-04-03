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

  beforeEach(() => {
    discord = new MockDiscord();
  });

  it("should fail when the pnj already exists", async () => {
    discord.mockMessage({ content: "!pnj add Test[House.A+5] test" });
    discord.message.attachments = [];
    discord.message.member = { roles: { array: () => [{ name: "MJ" }] } };

    try {
      await pnj(discord.message);
    } catch (e) {
      expect(e).toBe("Ce pnj existe déjà!");
    }
  });

  it("should add a pnj", async () => {
    discord.mockMessage({ content: "!pnj add AnotherTest[House.A+5] test" });
    discord.message.attachments = [];
    discord.message.member = { roles: { array: () => [{ name: "MJ" }] } };
    mockingoose(Pnj).toReturn(null, "findOne");

    const add = jest.fn();
    mockingoose(Pnj).toReturn(add, "save");
    await pnj(discord.message);

    expect(add).toBeCalled();
    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0].toBe("Pnj créée!"));
  });
});
