// api/register.js
import { supabase } from '../db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Only POST allowed');

  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).end('Missing username or password');
    }

    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('username', username);

    if (existing.length > 0) {
      return res.status(409).end('User already exists');
    }

    const { error } = await supabase
      .from('users')
      .insert([{ username, password }]);

    if (error) throw error;

    res.status(200).end('Successfully registered');
  } catch (err) {
    console.error(err);
    res.status(500).end('Supabase error');
  }
}
