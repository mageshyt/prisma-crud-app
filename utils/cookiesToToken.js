const { getJwtToken }= require('../helper/getJwtToken')


const cookiesToToken = (userId,res) => {
    const token = getJwtToken(userId);
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }) 
}

module.exports = {cookiesToToken}
