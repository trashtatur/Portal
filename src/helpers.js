module.exports.helpers = function() {
    return {
        json: function (name, context) {
            return JSON.stringify(name);
        }
    }
};
