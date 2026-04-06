export const programmingQuotes = [
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "First, solve the problem. Then, write the code.",
  "The best error message is the one that never shows up.",
  "Simplicity is the soul of efficiency.",
  "Make it work, make it right, make it fast.",
  "Code is like humor. When you have to explain it, it's bad.",
  "Programs must be written for people to read, and only incidentally for machines to execute.",
  "The most dangerous phrase in the language is we have always done it this way.",
  "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
  "Walking on water and developing software from a specification are easy if both are frozen.",
  "It is not enough for code to work.",
  "The function of good software is to make the complex appear to be simple.",
  "Before software can be reusable it first has to be usable.",
  "Debugging is twice as hard as writing the code in the first place.",
  "The best way to predict the future is to implement it.",
  "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
  "The only way to learn a new programming language is by writing programs in it.",
  "Sometimes it pays to stay in bed on Monday rather than spending the rest of the week debugging Monday's code.",
  "Experience is the name everyone gives to their mistakes.",
  "Java is to JavaScript what car is to carpet.",
  "Deleted code is debugged code.",
  "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
  "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.",
  "There are only two hard things in computer science: cache invalidation and naming things.",
  "Talk is cheap. Show me the code.",
  "Truth can only be found in one place: the code.",
  "Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime.",
  "In theory there is no difference between theory and practice. In practice there is.",
  "A language that does not affect the way you think about programming is not worth knowing.",
  "The computer was born to solve problems that did not exist before.",
];

export const bookQuotes = [
  "It is a truth universally acknowledged that a single man in possession of a good fortune must be in want of a wife.",
  "All happy families are alike; each unhappy family is unhappy in its own way.",
  "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness.",
  "In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a bad move.",
  "It is only with the heart that one can see rightly; what is essential is invisible to the eye.",
  "So we beat on, boats against the current, borne back ceaselessly into the past.",
  "All that is gold does not glitter, not all those who wander are lost.",
  "The only thing we have to fear is fear itself.",
  "I have not failed. I have just found ten thousand ways that will not work.",
  "The world breaks everyone and afterward many are strong at the broken places.",
  "We are what we repeatedly do. Excellence then is not an act but a habit.",
  "In three words I can sum up everything I have learned about life: it goes on.",
  "Not all those who wander are lost.",
  "The only impossible journey is the one you never begin.",
  "It does not do to dwell on dreams and forget to live.",
  "There is no greater agony than bearing an untold story inside you.",
  "To live is the rarest thing in the world. Most people exist, that is all.",
  "Whenever you find yourself on the side of the majority, it is time to pause and reflect.",
  "The man who does not read has no advantage over the man who cannot read.",
  "A room without books is like a body without a soul.",
  "Two things are infinite: the universe and human stupidity; and I am not sure about the universe.",
  "You miss one hundred percent of the shots you never take.",
  "Life is what happens to you while you are busy making other plans.",
  "Stay hungry, stay foolish.",
  "The unexamined life is not worth living.",
  "That which does not kill us makes us stronger.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
  "The journey of a thousand miles begins with a single step.",
  "Knowledge speaks but wisdom listens.",
  "Do not go where the path may lead, go instead where there is no path and leave a trail.",
];

export function getRandomQuote() {
  const allQuotes = [...programmingQuotes, ...bookQuotes];
  return allQuotes[Math.floor(Math.random() * allQuotes.length)];
}

export function getQuoteWords(targetCount) {
  const result = [];
  const allQuotes = [...programmingQuotes, ...bookQuotes];
  const shuffled = allQuotes.sort(() => Math.random() - 0.5);

  for (const quote of shuffled) {
    const quoteWords = quote.split(/\s+/);
    result.push(...quoteWords);
    if (result.length >= targetCount) break;
  }

  return result.slice(0, Math.max(targetCount, result.length));
}
