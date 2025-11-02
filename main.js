// main.js — entry point
import { mountAllCards } from "./modules/renderCards.js";

/**
 * Boot the app by rendering the initial set of cards.
 */
function bootApp() {
  mountAllCards();
}

bootApp();
