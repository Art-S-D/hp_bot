const { Player, Pnj } = require("mongo");
const mockingoose = require("mockingoose").default;
const MockDiscord = require("tests/MockDiscord");
const fakePlayer = require("tests/fakePlayer");
const fakePnj = require("tests/fakePnj");

const pnj = require(".");

describe("!pnj commands", () => {
  let discord = new MockDiscord();
  mockingoose(Player).toReturn(fakePlayer, "findOne");
  mockingoose(Pnj).toReturn(fakePnj, "findOne");

  beforeEach(() => {
    discord = new MockDiscord({ guild: { id: require("../serverId") } });
  });

  it("should not authorize addPnj", async () => {
    discord.mockMessage({ content: "!pnj add p[h.A] test" });
    discord.message.attachments = [];
    await pnj(discord.message);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toBe(
      "Vous devez être MJ pour effectuer cette action."
    );
  });

  it("should authorize getPnj", async () => {
    discord.mockMessage({ content: "!pnj p[h.A]" });
    await pnj(discord.message);

    expect(discord.replies.length).toBe(1);
    expect(discord.replies[0]).toMatch(/This a PNJ for testing purposes*/);
  });
});
