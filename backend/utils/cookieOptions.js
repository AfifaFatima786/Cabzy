const  cookieOptions ={
    httpOnly: true,
    sameSite: 'lax',
    secure: false,
    maxAge: 60 * 60 * 1000
  }


  module.exports = cookieOptions