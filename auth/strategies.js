const User = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const cookieExtractor = (req) => {
	let token = null;
	if (req && req.cookies) {
		token = req.cookies["token"];
	}
	return token;
};

const options = {
	jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
	secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(options, async (jwt_payload, done) => {	
	try {
		const userValid = await User.findByPk(jwt_payload.user_id);
		if (userValid) {
			return done(null, userValid);
		} else {			
			return done(null, false);
		}
	} catch (error) {		
		console.error(error);
		return done(error, error);
	}
});

module.exports = jwtStrategy;
