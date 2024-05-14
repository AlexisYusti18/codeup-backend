const nodemailer = require('nodemailer') //REQUIERO NODE MAILER
const {google} = require('googleapis')
const OAuth2 = google.auth.OAuth2


const verificacion = async (email, uniqueString) => {
    
    const myOAuth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.SECRET_CLIENT,
        "https://developers.google.com/oauthplayground"
    )
    //console.log('myOAuth2Client'+ myOAuth2Client)

    myOAuth2Client.setCredentials({
        refresh_token:process.env.REFRESH_TOKEN
    })

    const accessToken= myOAuth2Client.getAccessToken()
    //console.log('accessToken'+ accessToken)

    const transporter = nodemailer.createTransport({
        service:'gmail',
        
        auth: {
            user: process.env.USER,
            type:'OAuth2',
            clientId:process.env.CLIENT_ID,
            clientSecret:process.env.SECRET_CLIENT,
            refreshToken:process.env.REFRESH_TOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false
        }
        //TLS=>ANTIVIRUS BLOQ
    })

    let emailOptions = {
        //DESDE MI EMAIL
        from: process.env.USER,
        to: email,
        subject: 'VERIFY ACCOUNT',
        html: `
        <div style="background-image: url(https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80); background-position: center; background-size: cover; background-repeat: no-repeat; height: 40vh; width: 20vw;">
        <div>
          <h1 style="color:white; text-align: center; height: 15vh;">MyTinerary</h1>
        </div>
       <div style="text-align:center;">
        <a href=https://mytinerary-yusti.herokuapp.com/api/verify/${uniqueString} style="height: 10vh; background-color: yellow; text-align:center; padding: 1.3em 3em; font-size: 12px; text-transform: uppercase; letter-spacing: 2.5px; font-weight: 500; border: none; border-radius: 45px; box-shadow:0px 8px 15px rgba(0, 0, 0, 0.1); transition: all 0.3s ease 0s; cursor: pointer; outline: none; text-decoration: none;">Click here!</a>
       </div>
      </div>
         
     `
    }   

    transporter.sendMail(emailOptions, function (error, response){
        if(error){
            console.log(error);
        } else {
            //console.log(`check ${email}`);
        }
    })
}
module.exports=verificacion