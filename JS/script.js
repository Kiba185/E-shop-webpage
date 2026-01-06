// Jednoduchý skript pro demo košíku
// Funkce: při kliknutí na tlačítko "Přidat do košíku" se zvýší počet v košíku
// a krátce se zobrazí jednoduché potvrzení.

(function () {
	'use strict';

	// Najdi všechna tlačítka pro přidání do košíku
	var addButtons = document.querySelectorAll('.product-card .btn');
	var cartCountEl = document.querySelector('.cart-count');

	// Pokud chybí element košíku nebo tlačítka, nic neděláme
	if (!cartCountEl || !addButtons.length) {
		return;
	}

	// Parsuj aktuální hodnotu v košíku (fallback na 0)
	function getCartCount() {
		var n = parseInt(cartCountEl.textContent, 10);
		return isNaN(n) ? 0 : n;
	}

	// Nastaví novou hodnotu
	function setCartCount(v) {
		cartCountEl.textContent = String(v);
	}

	// Vytvoří a zobrazí krátké potvrzení u tlačítka
	function showToast(button, message) {
		var toast = document.createElement('span');
		toast.className = 'mini-toast';
		toast.textContent = message;
		toast.style.position = 'absolute';
		toast.style.background = 'rgba(0,0,0,0.75)';
		toast.style.color = '#fff';
		toast.style.padding = '6px 8px';
		toast.style.borderRadius = '4px';
		toast.style.fontSize = '0.85rem';
		toast.style.transform = 'translateY(-8px)';
		toast.style.opacity = '0';
		toast.style.transition = 'opacity 180ms ease, transform 180ms ease';

		// umístíme toast relativně k tlačítku (obalíme tlačítko, pokud je potřeba)
		var parent = button.parentElement;
		parent.style.position = parent.style.position || 'relative';
		parent.appendChild(toast);

		// krátké zobrazení
		requestAnimationFrame(function () {
			toast.style.opacity = '1';
			toast.style.transform = 'translateY(-14px)';
		});

		setTimeout(function () {
			toast.style.opacity = '0';
			toast.style.transform = 'translateY(-8px)';
			setTimeout(function () {
				if (toast && toast.parentElement) {
					toast.parentElement.removeChild(toast);
				}
			}, 200);
		}, 900);
	}

	// Přidáme posluchače na všechna tlačítka
	addButtons.forEach(function (btn) {
		btn.addEventListener('click', function (e) {
			e.preventDefault();
			var current = getCartCount();
			setCartCount(current + 1);
			showToast(btn, 'Přidáno do košíku');
		});
	});

})();

