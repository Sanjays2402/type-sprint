export const words = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
  "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
  "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
  "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
  "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
  "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "great", "between", "need", "large", "often", "hand", "high", "place", "hold", "free",
  "real", "life", "few", "north", "open", "seem", "together", "next", "white", "children",
  "begin", "got", "walk", "example", "ease", "paper", "group", "always", "music", "those",
  "both", "mark", "book", "letter", "until", "mile", "river", "car", "feet", "care",
  "second", "enough", "plain", "girl", "usual", "young", "ready", "above", "ever", "red",
  "list", "though", "feel", "talk", "bird", "soon", "body", "dog", "family", "direct",
  "pose", "leave", "song", "measure", "door", "product", "black", "short", "numeral",
  "class", "wind", "question", "happen", "complete", "ship", "area", "half", "rock",
  "order", "fire", "south", "problem", "piece", "told", "knew", "pass", "since", "top",
  "whole", "king", "space", "heard", "best", "hour", "better", "true", "during", "hundred",
  "five", "remember", "step", "early", "hold", "west", "ground", "interest", "reach",
  "fast", "verb", "sing", "listen", "six", "table", "travel", "less", "morning", "ten",
  "simple", "several", "vowel", "toward", "war", "lay", "against", "pattern", "slow",
  "center", "love", "person", "money", "serve", "appear", "road", "map", "rain",
  "rule", "govern", "pull", "cold", "notice", "voice", "unit", "power", "town",
  "fine", "certain", "fly", "fall", "lead", "cry", "dark", "machine", "note",
  "wait", "plan", "figure", "star", "box", "noun", "field", "rest", "correct",
  "able", "pound", "done", "beauty", "drive", "stood", "contain", "front", "teach",
  "week", "final", "gave", "green", "oh", "quick", "develop", "ocean", "warm",
  "atom", "human", "history", "mother", "effect", "electric", "expect", "crop",
  "modern", "element", "hit", "student", "corner", "party", "supply", "bone",
  "rail", "imagine", "provide", "agree", "thus", "capital", "chair", "danger",
  "fruit", "rich", "thick", "soldier", "process", "operate", "practice", "separate",
  "difficult", "doctor", "please", "protect", "noon", "whose", "locate", "ring",
  "character", "insect", "caught", "period", "indicate", "radio", "spoke", "atom",
  "village", "possible", "heart", "solution", "magnet", "silver", "thank",
  "branch", "match", "suffix", "especially", "fig", "afraid", "huge", "sister",
  "steel", "discuss", "forward", "similar", "guide", "experience", "score",
  "apple", "bought", "length", "condition", "special", "difficult", "coast",
  "bottom", "island", "wonder", "smile", "angle", "amount", "planet",
  "garden", "strange", "caught", "string", "surprise", "quiet", "ancient",
  "stick", "dollar", "stream", "spread", "cattle", "gather", "brown",
  "clean", "break", "nothing", "circle", "result", "sound", "energy",
  "probably", "believe", "consider", "suggest", "popular", "beautiful",
  "actually", "different", "describe", "position", "surface", "trouble",
  "industry", "weather", "finally", "language", "perform", "produce",
  "serious", "problem", "program", "perhaps", "require", "suggest",
  "important", "continue", "thousand", "natural", "general", "present",
  "support", "control", "discover", "student", "research", "already",
  "thought", "develop", "special", "meaning", "kitchen", "connect",
  "morning", "walking", "sending", "nothing", "brother", "herself",
  "picture", "current", "outside", "brought", "company", "society",
  "through", "country", "between", "turning", "working", "waiting",
  "without", "another", "evening", "meeting", "morning", "reading",
  "running", "looking", "growing", "sitting", "feeling", "writing",
  "keeping", "helping", "finding", "telling", "calling", "playing",
  "leading", "landing", "jumping", "staying", "closing", "opening",
  "dancing", "singing", "drawing", "cooking", "fishing", "driving",
  "trading", "testing", "setting", "getting", "cutting", "pulling",
  "pushing", "holding", "talking", "walking", "working", "resting",
  "amazing", "perfect", "freedom", "balance", "digital", "plastic",
  "weather", "morning", "thought", "machine", "network", "quantum",
  "explore", "journey", "mystery", "silence", "chapter", "library",
  "victory", "courage", "passion", "imagine", "reflect", "embrace",
  "whisper", "thunder", "horizon", "cascade", "phoenix", "crystal",
  "elegant", "dynamic", "vibrant", "curious", "radical", "vintage"
];

export function generateWords(count = 50) {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(words[Math.floor(Math.random() * words.length)]);
  }
  return result;
}

export function getWordCount(seconds) {
  if (seconds <= 15) return 40;
  if (seconds <= 30) return 70;
  if (seconds <= 60) return 120;
  return Math.ceil(seconds * 2.2);
}
