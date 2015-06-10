/* allthepokemon.js */

'use strict';

var allThePokemon = {
	maxNationalIndex: 152,

	loadPokemon: function() {
		var pokemonArea = $('#pokemon');

		for (var n = 1; n <= allThePokemon.maxNationalIndex; n++) {
			pokemonArea.append('<div class="onePokemon" id="pokemon' + n + '"><span class="pokemonPlaceholder">' + n + '</span></div>');
		}

		$.ajax('http://pokeapi.co/api/v1/pokedex/1/')
			.done(function(data) {
				allThePokemon.getPokemonDetail(data);
			})
			.fail(function() {
				console.log('Error getting pokemon list :(');
			}
		);
	},

	getPokemonDetail: function(pokemonData) {
		var pokemon = pokemonData.pokemon;

		for (var n = 0; n < pokemon.length; n ++) {
			var thisPokemon = pokemon[n];
			if (Number(thisPokemon.resource_uri.split('/')[3]) <= allThePokemon.maxNationalIndex) {
				$.ajax('http://pokeapi.co/' + thisPokemon.resource_uri)
					.done(function(data) {
						allThePokemon.getSpriteData(data);
					})
					.fail(function() {
						console.log('Error getting pokemon detail :(');
					}
				);
			}
		}
	},

	getSpriteData: function(pokemon) {
		if (pokemon.sprites[0]) {
			$.ajax('http://pokeapi.co' + pokemon.sprites[0].resource_uri)
				.done(function(spriteData) {
					$('#pokemon' + Number(pokemon.national_id)).html('<img class="pokemonImage" src="http://pokeapi.co' + spriteData.image + '" alt="Pokemon Image"/>' + '<br/><span class="pokemonName">(#' + pokemon.national_id + ') ' + pokemon.name + '</span>');
				})
				.fail(function() {
					console.log('Error getting sprite detail :(');
				}
			);
		} else {
			console.log('No sprite for ' + pokemon.name + ' - ignoring.');
		} 	
	}
};

window.onload = function() {
	allThePokemon.loadPokemon();
};