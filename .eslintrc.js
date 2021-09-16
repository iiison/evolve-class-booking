module.exports = {
  env : {
    jest     : true,
    browser  : true,
    commonjs : true,
    es2021   : true
  },
  extends : [
    'airbnb-base'
  ],
  parserOptions : {
    ecmaVersion : 12
  },
  rules : {
    semi                   : 0,
    'comma-dangle'         : 0,
    'no-underscore-dangle' : 0,
    'arrow-parens'         : ['error', 'as-needed'],
    'key-spacing'          : [
      2,
      {
        beforeColon : true,
        align       : {
          beforeColon : true,
          afterColon  : true,
          on          : 'colon'
        }
      }
    ]
  },
};
