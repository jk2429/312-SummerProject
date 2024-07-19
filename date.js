exports.getDate = function() {
	const today = new Date();
	const options = {month: "nermeric", day: "numeric", year: "numeric"};
	return today.toLocaleDateString("en-US", options);
};