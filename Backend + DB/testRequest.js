const axios = require('axios');

const registerUser = async () => {
  try {
    const response = await axios.post('http://localhost:6969/users/register', {
      username: 'Alisha Richardson',
      email: 'Alisha.richardson@tlan.com',
      password: 'Pass1q2w3e',
    });
    console.log(response.data); // Log the response from the server
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};

registerUser();
