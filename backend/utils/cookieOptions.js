const  cookieOptions ={
    httpOnly: true,
    sameSite: 'none',
    secure: false,
    maxAge: 60 * 60 * 1000
  }


  module.exports = cookieOptions