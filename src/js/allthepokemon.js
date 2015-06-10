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
			$.ajax('http://pokeapi.co/api/v1/pokemon/' + n + '/')
				.done(function(pokemon) {
					console.log('looking for #pokemon' + Number(pokemon.national_id));
					$('#pokemon' + Number(pokemon.national_id)).html('<img class="pokemonImage" src="http://pokeapi.co/media/img/' + Number(pokemon.national_id) + '.png" alt="Pokemon Image"/>' + '<br/><span class="pokemonName">(#' + pokemon.national_id + ') ' + pokemon.name + '</span>');
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