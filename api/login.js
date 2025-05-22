// api/login.js
import { supabase } from '../db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Only POST allowed');

  try {
    const { username, password } = req.body;

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password);

    if (error) throw error;

    if (data.length > 0) {
      res.status(200).end('Login successful. You are a validated user.');
    } else {
      res.status(401).end('Invalid username or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).end('Supabase error');
  }
}
