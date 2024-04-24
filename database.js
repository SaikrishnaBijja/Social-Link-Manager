import { get } from "http";
import sql from "mysql2";

const pool = sql
  .createPool({
    host: "localhost",
    user: "root",
    password: "tiger",
    database: "social",
  })
  .promise();

export async function addEntry(body) {
  const insertUser = "insert into users values(?,?,?,?)";
  const insertLinks = "insert into links values(?,?,?,?,?,?,?,?,?,?,?)";
  await pool.query(insertUser, [body.id, body.name, body.pass, body.bio]);
  await pool.query(insertLinks, [
    body.id,
    body.git,
    body.link,
    body.insta,
    body.tX,
    body.fb,
    body.email,
    body.hack,
    body.leet,
    body.chef,
    body.port,
  ]);
}

export async function validateUser(id, pass) {
  const validUser = "select * from users where id=?";
  const [result] = await pool.query(validUser, [id]);
  if (result[0].password === pass) {
    return true;
  } else {
    return flase;
  }
}

export async function getUser(id) {
  const userInfo = "select * from users where id=?";
  const [result] = await pool.query(userInfo, [id]);

  return result[0];
}
export async function linkInfo(id) {
  const linkInfo = "select * from links where id=?";
  const [links] = await pool.query(linkInfo, [id]);
  return links[0];
}
