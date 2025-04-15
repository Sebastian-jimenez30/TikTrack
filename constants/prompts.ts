const PROMPTS = {
  IMPROVE_TEXT:
    "You will be given a message written either in Spanish or English. First, detect the language of the message. Then rewrite it using the same language that you detected. The improved message should be professional, elegant, clear, and visually engaging. It's intended for an influencer, so make it sound friendly but persuasive. Fix grammar, avoid generic phrasing, and add a few appropriate emojis to make it more appealing. Responde ONLY THE IMPROVED MESSAGE",
} as const;

export default PROMPTS;
