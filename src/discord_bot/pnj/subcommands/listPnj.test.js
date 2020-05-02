const { Player, Pnj } = require("mongo");
const mockingoose = require("mockingoose").default;
const MockDiscord = require("tests/MockDiscord");
const fakePlayer = require("tests/fakePlayer");
const fakePnj = require("tests/fakePnj");

const pnj = require("..");

describe("!pnj list command", () => {
  let discord = new MockDiscord();
  mockingoose(Player).toReturn(fakePlayer, "findOne");
  mockingoose(Pnj).toReturn([fakePnj, fakePnj], "find");

  beforeEach(() => {
    discord = new MockDiscord();
  });

  it("should list the pnjs", async () => {
    discord.mockMessage({ content: "!pnj list" });
    discord.message.attachments = [];
    discord.message.member = { roles: { array: () => [{ name: "MJ" }] } };

    await pnj(discord.message);

    expect(discord.replies.length).toBe(2);
    expect(discord.replies[0]).toMatch(/This a PNJ for testing purposes*/);
    expect(discord.replies[1]).toMatch(/This a PNJ for testing purposes*/);
  });
});
