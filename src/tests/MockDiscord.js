//https://github.com/discordjs/discord.js/issues/3576

const Discord = require("discord.js");

class MockDiscord {
  // client;
  // guild;
  // channel;
  // guildChannel;
  // textChannel;
  // user;
  // guildMember;
  // message;

  constructor(opt = {}) {
    this.mockClient(opt.client);

    this.mockGuild(opt.guild);

    this.mockChannel(opt.channel);

    this.mockGuildChannel(opt.guildChannel);

    this.mockTextChannel(opt.textChannel);

    this.mockUser(opt.user);

    this.mockGuildMember(opt.guildMember);

    this.guild.members.set(this.guildMember.id, this.guildMember);

    this.mockMessage(opt.message);
    this.replies = [];
  }

  mockClient(opt = {}) {
    this.client = new Discord.Client();
  }

  mockGuild(opt = {}) {
    this.guild = new Discord.Guild(
      this.client,
      Object.assign(
        {
          unavailable: false,
          id: "guild-id",
          name: "mocked discord.js guild",
          icon: "mocked guild icon url",
          splash: "mocked guild splash url",
          region: "eu-west",
          member_count: 42,
          large: false,
          features: [],
          application_id: "application-id",
          afkTimeout: 1000,
          afk_channel_id: "afk-channel-id",
          system_channel_id: "system-channel-id",
          embed_enabled: true,
          verification_level: 2,
          explicit_content_filter: 3,
          mfa_level: 8,
          joined_at: new Date("2018-01-01").getTime(),
          owner_id: "owner-id",
          channels: [],
          roles: [],
          presences: [],
          voice_states: [],
          emojis: [],
        },
        opt
      )
    );
  }

  mockChannel(opt = {}) {
    this.channel = new Discord.Channel(
      this.client,
      Object.assign(
        {
          id: "channel-id",
        },
        opt
      )
    );
  }

  mockGuildChannel(opt = {}) {
    this.guildChannel = new Discord.GuildChannel(
      this.guild,
      Object.assign(
        {
          ...this.channel,

          name: "guild-channel",
          position: 1,
          parent_id: "123456789",
          permission_overwrites: [],
        },
        opt
      )
    );
  }

  mockTextChannel(opt = {}) {
    this.textChannel = new Discord.TextChannel(
      this.guild,
      Object.assign(
        {
          ...this.guildChannel,

          topic: "topic",
          nsfw: false,
          last_message_id: "123456789",
          lastPinTimestamp: new Date("2019-01-01").getTime(),
          rate_limit_per_user: 0,
        },
        opt
      )
    );
  }

  mockUser(opt = {}) {
    this.user = new Discord.User(
      this.client,
      Object.assign(
        {
          id: "user-id",
          username: "user username",
          discriminator: "user#0000",
          avatar: "user avatar url",
          bot: false,
        },
        opt
      )
    );
  }

  mockGuildMember(opt = {}) {
    this.guildMember = new Discord.GuildMember(
      this.guild,
      Object.assign(
        {
          deaf: false,
          mute: false,
          self_mute: false,
          self_deaf: false,
          session_id: "session-id",
          channel_id: "channel-id",
          nick: "nick",
          joined_at: new Date("2020-01-01").getTime(),
          user: this.user,
          roles: [],
        },
        opt
      )
    );
  }

  mockMessage(msg) {
    const message = Object.assign(
      {
        id: "message-id",
        type: "DEFAULT",
        content: "test message",
        author: this.user,
        webhook_id: null,
        member: this.guildMember,
        pinned: false,
        tts: false,
        nonce: "nonce",
        embeds: [],
        attachments: [],
        edited_timestamp: null,
        reactions: [],
        mentions: [],
        mention_roles: [],
        mention_everyone: [],
        hit: false,
      },
      msg
    );
    this.message = new Discord.Message(this.textChannel, message, this.client);
    this.message.reply = (content) => this.replies.push(content);
  }
}

module.exports = MockDiscord;
