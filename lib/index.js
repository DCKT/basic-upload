'use strict';

module.exports = function(birthYear, birthMonth) {
	var today = new Date();
	var age = today.getFullYear() - birthYear;

	return today.getMonth() > birthMonth ? age : age - 1;
}