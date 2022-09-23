import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt'
import {SECRET_JWT_TOKEN} from '../config/config'

const opt : StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_JWT_TOKEN
}

const passport = new Strategy(opt, async(payload, done) => {
    try{
        console.log(done(null,payload))
        return done(null,payload)
    }catch(error){
        console.log(error)
        done(error)
    }
});

export default passport