// api/confirm.js
const express = require("express");
const { Client } = require("@notionhq/client");

const app = express();
app.use(express.json());

// Configuración de Notion
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.DATABASE_ID;

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando en Vercel 🎉");
});

// Ruta para confirmar invitados
app.post("/api/confirm", async (req, res) => {
  try {
    const { nombre, email, asistencia } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ success: false, message: "Faltan datos" });
    }

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Nombre: {
          title: [{ text: { content: nombre } }]
        },
        Email: {
          rich_text: [{ text: { content: email } }]
        },
        Asistencia: {
          checkbox: !!asistencia
        },
        Fecha: {
          date: { start: new Date().toISOString() }
        }
      }
    });

    res.json({ success: true, pageId: response.id });
  } catch (error) {
    console.error("Error en Notion:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Exportar app para Vercel
module.exports = app;
