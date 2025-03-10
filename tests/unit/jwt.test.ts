// tests/jwt.test.ts
import { JwtService } from "../../src/infrastructure/services/jwt.service";

// Prueba del servicio JWT
function testJwtService() {
  const jwtService = new JwtService();

  // Datos de prueba
  const payload = {
    userId: 123, // Usamos `userId` en lugar de `id`
    email: "user@example.com",
    role: "user",
  };

  // 1. Generar un token
  const token = jwtService.generateToken(payload);
  console.log("Token generado:", token);

  // 2. Verificar el token
  try {
    const decodedPayload = jwtService.verifyToken(token);
    console.log("Payload decodificado:", decodedPayload);
  } catch (error) {
    console.error("Error al verificar el token:", error);
  }
}

// Ejecutar la prueba
testJwtService();