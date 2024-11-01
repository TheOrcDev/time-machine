"use server";

export async function getHistoricalData(
  date: Date,
  latitude: number,
  longitude: number
) {
  const prompt = `
    Make a fictional story about what was happening. It doesn't need to be real, but use the real events and information to make it as realistic as possible.
    I want to know what was happening on exactly these coordinates on this date: ${date.toISOString()}.

    Coordinates: ${latitude}, ${longitude}

    Explain it like I'm standing there. 

    Describe the weather, the people, the buildings, the food, the traffic, the news, the events, the culture, the history, the weather.

    If this date is in the future, explain what will happen, like a fantasy story.
  `;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();

  return data.choices[0].message.content;
}
