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
        "Please use other CT-1176 terminals to provide a deeper glimpse into what has been discovered through our R&D efforts.",
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
      content: "Wonder if any of them open a door out of here.",
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
      endOfConvo: false,
    },
    {
      content: "Wait, can you respond to me?",
      speaker: DialogSettings.PLAYER,
      endOfConvo: false,
    },
    {
      content: "[ END OF DIM-1 JUMP SCRIPT ]",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content: "Guess that's a no.",
      speaker: DialogSettings.PLAYER,
      endOfConvo: true,
    },
  ],
  c3: [
    {
      content: "Welcome! Glad you have arrived.",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content: "Uhm....",
      speaker: DialogSettings.PLAYER,
      endOfConvo: false,
    },
    {
      content: "Didn't you just have a big red X on your screen?",
      speaker: DialogSettings.PLAYER,
      endOfConvo: false,
    },
    {
      content: "Impossible. I am fully functional.",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content: "...",
      speaker: DialogSettings.PLAYER,
      endOfConvo: false,
    },
    {
      content:
        "Oh right, you're just running a script. You can't give me any real answers...",
      speaker: DialogSettings.PLAYER,
      endOfConvo: false,
    },
    {
      content: "I beg your pardon?!",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content:
        "I am more than capable of holding an intelligent conversation, thank you very much.",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content:
        "Perhaps the Computrons in the place from which you just arrived were primitive simpletons...",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content: "Terribly sorry! I didn't mean to be ru...",
      speaker: DialogSettings.PLAYER,
      endOfConvo: false,
    },
    {
      content:
        "Hold on, you say 'place from which I just arrived'? What do you mean by that?",
      speaker: DialogSettings.PLAYER,
      endOfConvo: false,
    },
    {
      content: "I've been stuck down here for what feels like days.",
      speaker: DialogSettings.PLAYER,
      endOfConvo: false,
    },
    {
      content:
        "You were here already, but not the you to whom I currently speak.",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content:
        "There is clearly a measurable change in mental variance from when we spoke earlier.",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content: "As though you have just awoke from a dream...",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content: "Yes! I just woke up in this cave and am trying to get out!",
      speaker: DialogSettings.PLAYER,
      endOfConvo: false,
    },
    {
      content: "Any chance you have directions for a way out of this place?",
      speaker: DialogSettings.PLAYER,
      endOfConvo: false,
    },
    {
      content: "[ END OF DIM-2 ADVANCED CONVERSATION SCRIPT ]",
      speaker: DialogSettings.COMPUTRON,
      endOfConvo: false,
    },
    {
      content: "WUT?!",
      speaker: DialogSettings.PLAYER,
      endOfConvo: true,
    },
  ],
};

export const getConversation = (conversationId) => {
  return conversations[conversationId];
};
