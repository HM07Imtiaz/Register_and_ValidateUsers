import { supabase } from '../db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Only POST allowed');

  try {
    const { username, password } = req.body;

    // Get the user by username
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // For now using plaintext check (replace with bcrypt if hashed)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Strip password from response before sending
    const { password: _, ...safeUser } = user;

    return res.status(200).json(safeUser);
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Supabase error' });
  }
}
