const { User } = require("../models/user");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(options, (jwt_payload, done) => {
	User.findOne(
		{
			where: {
				id: jwt_payload.user_id,
			},
		},
		(error, user) => {
			if (error) {
				return done(error, false);
			}
			if (user) {
				return done(null, user);
			}
			return done(null, false);
		}
	);
});

module.exports = jwtStrategy;
