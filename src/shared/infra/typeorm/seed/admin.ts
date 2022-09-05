import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection();
  const id = uuidV4();
  const password = await hash("admin", 10);

  await connection.query(`
    INSERT INTO users(
      id, name, email, password, created_at
    ) values (
      '${id}', 'admin', 'admin@pebmed.com.br', '${password}', 'now()'
    )
  `);

  await connection.close();
}

create().then(() => {
  console.log("✅ User admin created");
});
