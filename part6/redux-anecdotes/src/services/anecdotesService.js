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

const updateVote = async (id, vote) => {
  const getItem = await fetch(`${baseUrl}/${id}`);
  const item = await getItem.json();
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, votes: item.votes + vote }),
    });
    const data = await response.json();
    console.log(`RESP: ${data}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getAnecdotes, createNew, updateVote };
