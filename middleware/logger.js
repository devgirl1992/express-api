
function log (req, res, next){
    console.log('call first middleware...')
    next()
};


module.exports = log;