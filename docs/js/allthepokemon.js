/* allthepokemon.js */

'use strict';

var allThePokemon = {
	maxNationalIndex: 152,

	loadPokemon: function() {
		var pokemonArea = $('#pokemon');
		var n = 1;

		for (; n <= allThePokemon.maxNationalIndex; n++) {
			pokemonArea.append('<div class="onePokemon" id="pokemon' + n + '"><span class="pokemonPlaceholder">' + n + '</span></div>');
		}

		for (n = 1; n <= allThePokemon.maxNationalIndex; n++) {
			$.ajax(' http://pokeapi.salestock.net/api/v2/pokemon/' + n + '/')
				.done(function(pokemon) {
					console.log('looking for #pokemon' + Number(pokemon.id));
					$('#pokemon' + Number(pokemon.id)).html('<img class="pokemonImage" src="' + pokemon.sprites.front_default + '" alt="Pokemon Image"/>' + '<br/><span class="pokemonName">(#' + pokemon.id + ') ' + pokemon.name + '</span>');
				})
				.fail(function() {
					console.log('Error getting pokemon detail :(');
				}
			);
		}
	}
};

window.onload = function() {
	allThePokemon.loadPokemon();
};