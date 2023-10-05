//Бургер меню
$(document).ready(function() {
	$('.burger_menu').click(function(event) {
		$('.burger_menu,.menu').toggleClass('active_burger');
		$('body').toggleClass('lock');
	});
});
function changeBasketIcon () {
	let pathToImage = "images/icon_basket_card_default.png";
	if (document.getElementById("icon_basket_on_card").src == pathToImage) {
		document.getElementById("icon_basket_on_card").src = "images/icon_basket_card.png";
	} else {
		document.getElementById("icon_basket_on_card").src = "images/icon_basket_card_default.png";
	}
	
}