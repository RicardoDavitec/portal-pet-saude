import http from "node:http";

const faqs = [
  { id: "1", question: "O que e o PET Saude?", answer: "Programa de educacao pelo trabalho.", category: "geral" },
];
const conversas = [{ id: "c1", createdAt: new Date().toISOString(), situacao: "validas" }];

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  res.setHeader("Content-Type", "application/json");
  if (req.method === "GET" && url.pathname === "/health") {
    res.end(JSON.stringify({ status: "ok", mock: true }));
    return;
  }
  if (req.method === "GET" && url.pathname === "/faqs") {
    res.end(JSON.stringify(faqs));
    return;
  }
  if (req.method === "GET" && url.pathname.startsWith("/faqs/")) {
    const id = url.pathname.split("/")[2];
    const faq = faqs.find((f) => f.id === id);
    res.statusCode = faq ? 200 : 404;
    res.end(JSON.stringify(faq ?? { message: "not found" }));
    return;
  }
  if (req.method === "POST" && url.pathname === "/faqs") {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
    const row = {
      id: String(faqs.length + 1),
      question: body.question,
      answer: body.answer,
      category: body.category ?? "geral",
    };
    faqs.push(row);
    res.end(JSON.stringify(row));
    return;
  }
  if (req.method === "PUT" && url.pathname === "/faqs") {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
    const idx = faqs.findIndex((f) => f.id === body.id);
    if (idx < 0) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "not found" }));
      return;
    }
    faqs[idx] = { ...faqs[idx], ...body, question: body.question ?? faqs[idx].question, answer: body.answer ?? faqs[idx].answer };
    res.end(JSON.stringify(faqs[idx]));
    return;
  }
  if (req.method === "GET" && url.pathname === "/conversas") {
    res.end(JSON.stringify(conversas));
    return;
  }
  if (req.method === "GET" && url.pathname.startsWith("/conversas/")) {
    res.end(JSON.stringify(conversas[0]));
    return;
  }
  res.statusCode = 404;
  res.end(JSON.stringify({ message: "not found" }));
});

const port = Number(process.env.PORT ?? 3813);
server.listen(port, "0.0.0.0", () => {
  console.log(`g1-mock on ${port}`);
});
