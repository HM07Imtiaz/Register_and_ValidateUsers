import { supabase } from '../db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Only POST allowed');

  try {
    const { username, password, fullname, email, phone, address } = req.body;

    // Basic validation
    if (!username || !password || !fullname || !email || !phone || !address) {
      return res.status(400).end('All fields are required');
    }

    // Check for existing user
    const { data: existing, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('username', username);

    if (checkError) throw checkError;
    if (existing && existing.length > 0) {
      return res.status(409).end('User already exists');
    }

    // Insert new user
    const { error } = await supabase
      .from('users')
      .insert([{
        username,
        password,
        fullname,
        email,
        phone,
        address
      }]);

    if (error) throw error;

    res.status(200).end('Successfully registered');
  } catch (err) {
    console.error('[REGISTER ERROR]', err);
    res.status(500).end('Supabase error');
  }
}
