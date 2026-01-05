const baseUrl = "http://localhost:3001/anecdotes";

const getAnecdotes = async () => {
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error();
  }
  return await response.json();
};

const createNew = async (content) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0 }),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }

  return await response.json();
};

const updateVote = async (id) => {
  const response = await fetch(baseUrl, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ votes: +1 }),
  });

  if (!response.ok) {
    throw new Error("Failed to create note");
  }
  return await response.json();
};
export { getAnecdotes, createNew, updateVote };
