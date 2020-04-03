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

  it("should work", async () => {
    discord.mockMessage({ content: "!pnj Test[House.A+5]" });

    await pnj(discord.message);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toMatch(/This a PNJ for testing purposes*/);
  });

  it("should fail if the pnj doesn't exists", async () => {
    discord.mockMessage({ content: "!pnj Test[House.A+5]" });

    try {
      await pnj(discord.message);
    } catch (e) {
      expect(e).toBe("Aucun pnj ne correspond à la description");
    }
  });
});
