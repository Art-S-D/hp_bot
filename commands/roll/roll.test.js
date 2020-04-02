const { Player } = require("../../models");
const mockingoose = require("mockingoose").default;
const MockDiscord = require("../../tests/MockDiscord");
const fakePlayer = require("../../tests/fakePlayer");

const roll = require("./index");

describe("!roll command", () => {
  let discord = new MockDiscord({});
  mockingoose(Player).toReturn(fakePlayer, "findOne");

  beforeAll(() => {});
  beforeEach(() => {
    discord = new MockDiscord({});
  });
  afterEach(() => {});

  it("should fail when it encounters an unexpected option", async () => {
    discord.mockMessage({ content: "!roll thisisatest" });
    try {
      await roll(discord.message, fakePlayer);
      expect(false);
    } catch (e) {
      expect(e.message).toBe(
        'Expected " ", "b", "bonus", "d", "diff", "f", "faces", "j", "joueur", "o", "objectif", "r", "relance", or "stp" but "t" found.'
      );
    }
  });

  it("should roll normally", async () => {
    discord.mockMessage({
      content: "!roll b bluff + rumeur + 500 r dcfm * 10 o 5 f 6"
    });
    roll(discord.message, fakePlayer);
    expect(discord.replies.length).toBe(2);
    expect(discord.replies[0]).toMatch(
      /résultat: [0-9]+[+]502=[0-9]+, attendu: 5,   \(faces:6, relance: 10\)/
    );
    expect(discord.replies[1]).toBe("success");
  });

  it("should reroll", async () => {
    discord.mockMessage({
      content: "!roll f 1 r 1"
    });
    roll(discord.message, fakePlayer);
    expect(discord.replies.length).toBe(4);
    expect(discord.replies[1]).toBe("relance");
  });
});
