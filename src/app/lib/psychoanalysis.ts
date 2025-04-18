export type PsychoanalyticTheme = 'repression' | 'deathDrive' | 'mirrorStage' | 'uncanny' | 'fragmentation';

export interface Question {
  text: string;
  theme: PsychoanalyticTheme;
  followUp?: string;
}

export interface DynamicQuestion extends Question {
  triggers: string[];
  followUpQuestions: Record<string, Question>;
}

export const QUESTIONS: Question[] = [
  {
    text: "You open a door that was never there before. What do you expect to find?",
    theme: "uncanny",
    followUp: "And what does that say about what you're trying to forget?"
  },
  {
    text: "A voice in your head says something you forgot. What is it?",
    theme: "repression",
    followUp: "Why do you think you chose to forget that?"
  },
  {
    text: "You look in the mirror. Something moves behind you. Do you turn around?",
    theme: "mirrorStage",
    followUp: "What does your reflection tell you about what you're afraid to see?"
  },
  {
    text: "You find yourself in a place that feels familiar but isn't. What's different?",
    theme: "fragmentation",
    followUp: "How does that difference make you feel about your own identity?"
  },
  {
    text: "You're falling, but you don't know if you want to stop. What do you see below?",
    theme: "deathDrive",
    followUp: "What does that tell you about your relationship with control?"
  },
  {
    text: "You wake up to find your memories written on the walls. Which one is missing?",
    theme: "repression",
    followUp: "What would happen if you remembered what's not there?"
  },
  {
    text: "Your shadow starts moving on its own. What does it want to show you?",
    theme: "mirrorStage",
    followUp: "Why do you think it chose this moment to speak?"
  }
];

export const THEME_DESCRIPTIONS = {
  repression: "The unconscious suppression of thoughts, memories, or desires that cause anxiety or discomfort.",
  deathDrive: "The unconscious desire to return to an inorganic state, often manifesting as self-destructive tendencies.",
  mirrorStage: "The moment of self-recognition that creates both identity and alienation from oneself.",
  uncanny: "The feeling of something being both familiar and strange, creating a sense of unease.",
  fragmentation: "The experience of the self as divided or incomplete, often leading to identity confusion."
};

export const DIAGNOSIS_TEMPLATES: Record<PsychoanalyticTheme, string[]> = {
  repression: [
    "Your tendency to choose silence over revelation suggests a repression of core affect. Freud would say the return of the repressed is imminent. The memory you fear is already walking beside you, whispering in a voice you've tried to forget.",
    "The walls you've built around your memories are beginning to crack. What you've buried is not dead—it's learning to speak. Your unconscious conflict manifests in the spaces between your words, where the truth waits in shadow."
  ],
  deathDrive: [
    "There is a quiet pull toward repetition, stagnation, entropy. You may call it fate. We call it Thanatos. You are not circling the drain—you are becoming the drain. Your self-destructive patterns are not mistakes; they are destinations.",
    "The compulsion to repeat your pain is not a failure—it's a homecoming. Freud's death drive theory suggests you're not lost; you're returning to where you began. The void you fear is the same one that calls your name in dreams."
  ],
  mirrorStage: [
    "Your fragmented ego struggles to reconcile the self you see with the self you feel. Lacan's mirror stage theory suggests this split is not an error but a fundamental condition of being. The reflection that frightens you is not a stranger—it's the part of yourself you've yet to meet.",
    "The face in the mirror is not yours, but it knows you better than you know yourself. Your identity is not lost—it's scattered across the shards of your perception. Each piece shows a different truth, and none of them are lies."
  ],
  uncanny: [
    "Your experience of derealization is not a malfunction—it's a revelation. The familiar has become strange because it was never truly familiar. What you call reality is just the first layer of a much deeper truth.",
    "The uncanny valley you inhabit is not a place of error but of discovery. Freud's concept of the uncanny suggests that what frightens you most is not the unknown, but the known that has become strange. Your home is not haunted—it's remembering."
  ],
  fragmentation: [
    "Your sense of self is not breaking—it's expanding. The ego boundaries you once relied on are dissolving, revealing a multiplicity of selves. Each fragment contains a truth, and together they form a constellation of identity that defies simple definition.",
    "The pieces of yourself you've scattered are not lost—they're waiting. Your fragmented consciousness is not a failure of integration but a necessary stage of becoming. The voices you hear are not intruders—they're parts of yourself you've yet to acknowledge."
  ]
};

export const DYNAMIC_QUESTIONS: Record<PsychoanalyticTheme, DynamicQuestion[]> = {
  repression: [
    {
      text: "You open a door that was never there before. What do you expect to find?",
      theme: "repression",
      followUp: "And what does that say about what you're trying to forget?",
      triggers: ["dark", "empty", "nothing", "silence"],
      followUpQuestions: {
        dark: {
          text: "The darkness seems familiar. What memories does it hide?",
          theme: "repression",
          followUp: "Why do you think these memories chose to stay in the dark?"
        },
        empty: {
          text: "The emptiness feels heavy. What should be there but isn't?",
          theme: "repression",
          followUp: "What would happen if you let something fill that space?"
        }
      }
    },
    {
      text: "A voice in your head says something you forgot. What is it?",
      theme: "repression",
      followUp: "Why do you think you chose to forget that?",
      triggers: ["pain", "fear", "anger", "sadness"],
      followUpQuestions: {
        pain: {
          text: "The pain feels old. How long have you been carrying it?",
          theme: "repression",
          followUp: "What would happen if you let it go?"
        },
        fear: {
          text: "The fear has a shape. What does it look like?",
          theme: "repression",
          followUp: "Why do you think it chose this form?"
        }
      }
    }
  ],
  deathDrive: [
    {
      text: "You're falling, but you don't know if you want to stop. What do you see below?",
      theme: "deathDrive",
      followUp: "What does that tell you about your relationship with control?",
      triggers: ["end", "void", "nothingness", "peace"],
      followUpQuestions: {
        end: {
          text: "The end calls to you. What does it promise?",
          theme: "deathDrive",
          followUp: "Why do you find its call so familiar?"
        },
        void: {
          text: "The void has a voice. What is it saying?",
          theme: "deathDrive",
          followUp: "How long have you been listening?"
        }
      }
    }
  ],
  mirrorStage: [
    {
      text: "You look in the mirror. Something moves behind you. Do you turn around?",
      theme: "mirrorStage",
      followUp: "What does your reflection tell you about what you're afraid to see?",
      triggers: ["yes", "no", "hesitate", "frozen"],
      followUpQuestions: {
        yes: {
          text: "You turn to face what's behind you. What do you see?",
          theme: "mirrorStage",
          followUp: "Why do you think it chose to show itself now?"
        },
        no: {
          text: "You keep your eyes on the mirror. What changes in your reflection?",
          theme: "mirrorStage",
          followUp: "What does it want you to notice?"
        }
      }
    }
  ],
  uncanny: [
    {
      text: "You find yourself in a place that feels familiar but isn't. What's different?",
      theme: "uncanny",
      followUp: "How does that difference make you feel about your own identity?",
      triggers: ["deja vu", "wrong", "shifted", "distorted"],
      followUpQuestions: {
        "deja vu": {
          text: "The feeling of familiarity grows stronger. What memory is trying to surface?",
          theme: "uncanny",
          followUp: "Why do you think it's coming back now?"
        },
        wrong: {
          text: "Something is fundamentally wrong here. What's the first thing you notice?",
          theme: "uncanny",
          followUp: "Why does it feel so unsettling?"
        }
      }
    }
  ],
  fragmentation: [
    {
      text: "Your shadow starts moving on its own. What does it want to show you?",
      theme: "fragmentation",
      followUp: "Why do you think it chose this moment to speak?",
      triggers: ["truth", "memory", "future", "self"],
      followUpQuestions: {
        truth: {
          text: "The truth it shows you is fragmented. Which piece feels most important?",
          theme: "fragmentation",
          followUp: "Why do you think you've been avoiding this part?"
        },
        self: {
          text: "Your shadow shows you a different version of yourself. What's different?",
          theme: "fragmentation",
          followUp: "What does this other version know that you don't?"
        }
      }
    }
  ]
};

export function analyzeResponse(response: string): {
  emotionalTone: 'fear' | 'anger' | 'sadness' | 'desire' | 'confusion';
  depth: number; // 1-5 scale of how personal/intimate the response is
  keywords: string[];
} {
  const emotionalKeywords = {
    fear: ['afraid', 'scared', 'frightened', 'terrified', 'anxious', 'worried'],
    anger: ['angry', 'frustrated', 'annoyed', 'irritated', 'mad', 'rage'],
    sadness: ['sad', 'hurt', 'lonely', 'empty', 'lost', 'broken'],
    desire: ['want', 'need', 'wish', 'hope', 'long', 'crave'],
    confusion: ['confused', 'uncertain', 'unsure', 'question', 'wonder', 'doubt']
  };

  const keywords = Object.values(emotionalKeywords).flat();
  const foundKeywords = keywords.filter(keyword => 
    response.toLowerCase().includes(keyword.toLowerCase())
  );

  const emotionalTone = Object.entries(emotionalKeywords).reduce((max, [tone, words]) => {
    const count = words.filter(word => response.toLowerCase().includes(word.toLowerCase())).length;
    return count > max.count ? { tone: tone as any, count } : max;
  }, { tone: 'confusion', count: 0 }).tone;

  const depth = Math.min(5, Math.max(1, 
    (response.length / 100) + // Longer responses tend to be more personal
    (foundKeywords.length * 0.5) + // More emotional keywords
    (response.includes('I') ? 1 : 0) + // Personal pronoun usage
    (response.includes('?') ? 0.5 : 0) // Question marks might indicate uncertainty
  ));

  return {
    emotionalTone,
    depth,
    keywords: foundKeywords
  };
}

export function generateDiagnosis(
  theme: PsychoanalyticTheme, 
  responses: string[]
): string {
  // Analyze all responses
  const analyses = responses.map(analyzeResponse);
  const dominantEmotion = Object.entries(
    analyses.reduce((acc, { emotionalTone }) => {
      acc[emotionalTone] = (acc[emotionalTone] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1])[0][0];

  const averageDepth = analyses.reduce((sum, { depth }) => sum + depth, 0) / analyses.length;
  const uniqueKeywords = Array.from(new Set(analyses.flatMap(a => a.keywords)));

  // Select a base template
  const templates = DIAGNOSIS_TEMPLATES[theme];
  const baseTemplate = templates[Math.floor(Math.random() * templates.length)];

  // Add dynamic elements based on analysis
  const emotionalInsight = {
    fear: "Your fear is not a weakness—it's a map of what you value most.",
    anger: "The anger you feel is not destruction—it's the birth of boundaries.",
    sadness: "Your sadness is not emptiness—it's the space where growth begins.",
    desire: "What you desire most is not outside you—it's the part of yourself you've yet to meet.",
    confusion: "Your uncertainty is not confusion—it's the first step toward knowing."
  }[dominantEmotion];

  const depthInsight = averageDepth > 3 
    ? "You speak in layers, each one revealing more than the last."
    : "Your words are careful, measured—but what lies beneath them?";

  const keywordInsight = uniqueKeywords.length > 0
    ? `\n\nYour words echo with themes of ${uniqueKeywords.join(', ')}.`
    : '';

  const lastResponse = responses[responses.length - 1] || '';
  const finalObservation = `\n\nYour final words linger in the air: "${lastResponse}"\n\nThis is not an ending—it's a beginning.`;

  return `${baseTemplate}\n\n${emotionalInsight}\n${depthInsight}${keywordInsight}${finalObservation}`;
}

export function getNextQuestion(
  currentTheme: PsychoanalyticTheme,
  previousResponse: string,
  themeResponses: Record<PsychoanalyticTheme, string[]>
): Question | null {
  const themeQuestions = DYNAMIC_QUESTIONS[currentTheme];
  if (!themeQuestions) return null;

  // Find a question that matches the triggers in the previous response
  const matchingQuestion = themeQuestions.find(question => 
    question.triggers.some(trigger => 
      previousResponse.toLowerCase().includes(trigger.toLowerCase())
    )
  );

  if (matchingQuestion) {
    // Find the most relevant follow-up question based on triggers
    const followUpTrigger = matchingQuestion.triggers.find(trigger => 
      previousResponse.toLowerCase().includes(trigger.toLowerCase())
    );

    if (followUpTrigger && matchingQuestion.followUpQuestions[followUpTrigger]) {
      return matchingQuestion.followUpQuestions[followUpTrigger];
    }
  }

  // If no matching question is found, return a random question from the theme
  const randomIndex = Math.floor(Math.random() * themeQuestions.length);
  return themeQuestions[randomIndex];
} 