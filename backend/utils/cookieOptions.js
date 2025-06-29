const  cookieOptions ={
    httpOnly: true,
    sameSite: 'Lax',
    secure: false,
    maxAge: 60 * 60 * 1000
  }


  module.exports = cookieOptions