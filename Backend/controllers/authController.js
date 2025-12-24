// server/controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const axios = require('axios');

// Helper to create JWT
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// ---------------------- Google OAuth ----------------------
const googleAuth = (req, res) => {
  const redirect_uri =
    'https://accounts.google.com/o/oauth2/v2/auth?' +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${process.env.SERVER_URL}/api/auth/google/callback`, 
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent',
    }).toString();

  res.redirect(redirect_uri);
};

const googleCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  try {
    // Exchange code for tokens
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', null, {
      params: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${process.env.SERVER_URL}/api/auth/google/callback`, // ✅ FIXED
        grant_type: 'authorization_code',
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const { id_token } = tokenRes.data;

    // Decode ID token
    const userInfo = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString());
    let user = await User.findOne({ email: userInfo.email });

    if (!user) {
      user = await User.create({
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture,
        googleId: userInfo.sub,
      });
    }

    // Create JWT
    const token = createToken(user);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    // Redirect to frontend dashboard
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Google login failed' });
  }
};

// ---------------------- Facebook OAuth ----------------------
const facebookAuth = (req, res) => {
  const redirect_uri =
    'https://www.facebook.com/v17.0/dialog/oauth?' +
    new URLSearchParams({
      client_id: process.env.FACEBOOK_CLIENT_ID,
      redirect_uri: `${process.env.SERVER_URL}/api/auth/facebook/callback`, // ✅ FIXED
      state: 'some_random_state',
      scope: 'email public_profile',
    }).toString();

  res.redirect(redirect_uri);
};

const facebookCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).json({ error: 'No code provided' });

  try {
    // Exchange code for access token
    const tokenRes = await axios.get('https://graph.facebook.com/v17.0/oauth/access_token', {
      params: {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET,
        redirect_uri: `${process.env.SERVER_URL}/api/auth/facebook/callback`, // ✅ FIXED
        code,
      },
    });

    const { access_token } = tokenRes.data;

    // Get user info
    const userRes = await axios.get('https://graph.facebook.com/me', {
      params: {
        fields: 'id,name,email,picture',
        access_token,
      },
    });

    const userInfo = userRes.data;
    let user = await User.findOne({ email: userInfo.email });

    if (!user) {
      user = await User.create({
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture?.data?.url,
        facebookId: userInfo.id,
      });
    }

    // Create JWT
    const token = createToken(user);

    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });

    // Redirect to frontend dashboard
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Facebook login failed' });
  }
};

// ---------------------- Logout ----------------------
const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

module.exports = {
  googleAuth,
  googleCallback,
  facebookAuth,
  facebookCallback,
  logout,
};
