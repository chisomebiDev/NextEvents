import fs from "fs";
import path from "path";

export function getPath() {
  return path.join(process.cwd(), "data", "comments.json");
}

export function getFileData(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  return data;
}

function handler(req, res) {
  if (req.method === "GET") {
    const eventId = req.query.eventId;

    const filePath = getPath();
    const fileData = getFileData(filePath);
    fs.writeFileSync(filePath, JSON.stringify(fileData));

    const comments = fileData[eventId];

    res.status(200).json({
      comments,
    });
  }

  if (req.method === "POST") {
    const { email, text, name } = req.body;

    if (!email.includes("@") || !name.trim() === "" || text.trim() === "") {
      res.status(422).json({ message: "Invalid input" });
      return;
    }
    const eventId = req.query.eventId;
    const filePath = getPath();
    const fileData = getFileData(filePath);
    fs.writeFileSync(filePath, JSON.stringify(fileData));

    const comments = fileData[eventId];

    fileData[eventId].push(req.body);
    fs.writeFileSync(filePath, JSON.stringify(fileData));

    res.status(200).json({
      message: "Added Comment",
      comments,
    });
  }
}

export default handler;
