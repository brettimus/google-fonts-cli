// this is a dumb name. 
// the fonter is a thing that provides functionality for spewing usage + error messages

module.exports = Fonter;

function Fonter() {}
// this should be two different functions ...
Fonter.prototype.printUsage = function(message) {
    if (message) {
        message = "* Error message below *\n" + message;
    }
    else {
        message = "";
    }
    console.log("\nSomething goofed up!\nUsage is:\n $ google-font <file> <font-name> <font-variants>\n\n"+message);
};