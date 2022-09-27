import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt'
import {SECRET_JWT_TOKEN} from '../config/config'
import authModel from '../components/auth/auth.model.DB';

const opt : StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_JWT_TOKEN
}

const passport = new Strategy(opt, async(payload, done) => {
    try{
        const user = await authModel.findOne({nickname: payload.nickanme}, {password: 0})
        return done(null, user?.nickname)
    }catch(error){
        //console.log(error)
        done(error)
    }
});

export default passport