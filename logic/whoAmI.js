
// Takes express request as an argument 

function who(req){
  var agent = req.headers["user-agent"];
  
  var agent = agent.slice(agent.indexOf("(") +1, agent.indexOf(")"));
  var lang = (req.headers["accept-language"].split(","))[0];
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  var config = {
    "ipAdress": ip,
    "language": lang,
    "os": agent,
  };
  return config;
}

module.exports = who;
