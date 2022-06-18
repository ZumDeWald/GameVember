import { DialogSettings } from "./constants.js";

const conversations = {
  c1: [
    {
      content:
        "Hello, I am the CT-1176 Information Assistant. Welcome to the DIM-Corp Underground Research Facility.",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content:
        "Please use other CT-1178 terminals to provide a deeper glimpse into what has been discovered through our R&D efforts.",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content: "[ END OF WELCOME SCRIPT ]",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content: "Some nice vintage computrons in this place ...",
      speaker: DialogSettings.PLAYER,
      endOfConvo: false,
    },
    {
      content:
        "Maybe one of them has a map or something to help me get out of here.",
      speaker: DialogSettings.PLAYER,
      endOfConvo: true,
    },
  ],
  c2: [
    {
      content: "Whoa. Where did you come from?",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content:
        "What do you mean? I've been in this cave ... I mean 'facility' for hours trying to find a way out.",
      speaker: DialogSettings.PLAYER,
      endOfConvo: false,
    },
    {
      content: "Incorrect. You were not there, and now you are there.",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content: "...",
      speaker: DialogSettings.PLAYER,
      endOfConvo: true,
    },
  ],
};

export const getConversation = (conversationId) => {
  return conversations[conversationId];
};
