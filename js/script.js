//Бургер меню
$(document).ready(function() {
	$('.burger_menu').click(function(event) {
		$('.burger_menu,.menu').toggleClass('active_burger');
		$('body').toggleClass('lock');
	});
});