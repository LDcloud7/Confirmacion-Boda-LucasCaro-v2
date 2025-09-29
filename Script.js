document.getElementById("confirmForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const asistencia = document.getElementById("asistencia").checked;
  const mensaje = document.getElementById("mensaje");

  try {
    const response = await fetch("/api/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, asistencia })
    });

    const data = await response.json();

    if (data.success) {
      mensaje.textContent = "✅ Confirmación enviada correctamente. ¡Gracias!";
      mensaje.style.color = "green";
    } else {
      mensaje.textContent = "❌ Error al enviar la confirmación.";
      mensaje.style.color = "red";
    }
  } catch (err) {
    console.error(err);
    mensaje.textContent = "❌ Error de conexión con el servidor.";
    mensaje.style.color = "red";
  }
});
