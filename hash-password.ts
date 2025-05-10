// hash-password.ts
import { hash } from "bcryptjs";

(async () => {
  const password = "123"; // Cambia esto si quieres
  const hashed = await hash(password, 10);
  console.log("Hashed password:", hashed);
})();
