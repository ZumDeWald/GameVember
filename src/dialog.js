import { DialogSettings } from "./constants.js";

const conversations = {
  c1: [
    {
      content: "This is the first sentence in the game.",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content:
        "This is the first response, which is the second sentence in the game.",
      speaker: DialogSettings.PLAYER,
      endOfConvo: true,
    },
  ],
};

export const getConversation = (conversationId) => {
  return conversations[conversationId];
};
