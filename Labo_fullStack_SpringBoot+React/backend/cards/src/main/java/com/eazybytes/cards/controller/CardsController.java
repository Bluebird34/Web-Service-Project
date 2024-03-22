package com.eazybytes.cards.controller;

import com.eazybytes.cards.model.Cards;
import com.eazybytes.cards.service.CardsService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CardsController {

    @Autowired
    private CardsService cardsService;

    @Operation(summary = "Get card by ID")
    @GetMapping("/myCard/{id}")
    public Cards getCardDetails(@PathVariable("id") int id) {
        return cardsService.getCardById(id);
    }

    @Operation(summary = "Get all cards")
    @GetMapping("/AllCards")
    public List<Cards> getAllCards() {
        return cardsService.getAllCards();
    }

    @Operation(summary = "Create a new card")
    @PostMapping("/newCard")
    public String newCard(@RequestBody Cards card) {
        return cardsService.saveCard(card);
    }

    @Operation(summary = "Update card by ID")
    @PutMapping("/update/{id}")
    public String updateCard(@PathVariable("id") int id, @RequestBody Cards updateCard) {
        return cardsService.updateCard(id, updateCard);
    }

    @Operation(summary = "Delete card by ID")
    @DeleteMapping("/deleteCard/{id}")
    public String deleteCardById(@PathVariable("id") int id) {
        return cardsService.deleteCardById(id);
    }

    @Operation(summary = "Insert multiple cards")
    @PostMapping("/newCards")
    public List<String> newCards(@RequestBody List<Cards> cardsList) {
        return cardsService.saveAll(cardsList);
    }

    @Operation(summary = "Delete all cards")
    @DeleteMapping("/deleteAllCards")
    public String deleteAllCards() {
        return cardsService.deleteAllCards();
    }

    @Operation(summary = "Delete card by card number")
    @DeleteMapping("/deleteCardByNumber/{cardNumber}")
    public String deleteCardByCardNb(@PathVariable("cardNumber") int cardNumber) {
        return cardsService.deleteCardByCardNb(cardNumber);
    }

    @Operation(summary = "Delete cards by customer ID")
    @DeleteMapping("/deleteCardsByCustomerId/{customerId}")
    public String deleteCardsByCustomerId(@PathVariable("customerId") int customerId) {
        // Call CustomerService to delete all cards associated with the given customer ID
        return cardsService.deleteCardsByCustomerId(customerId);
    }

    @Operation(summary = "Delete multiple cards by IDs")
    @DeleteMapping("/deleteMultipleCards")
    public String deleteMultipleCards(@RequestBody List<Integer> cardIds) {
        return cardsService.deleteMultipleCardsByIds(cardIds);
    }

    @Operation(summary = "Update card limit by card ID")
    @PutMapping("/updateCardLimit/{cardId}")
    public String updateCardLimit(@PathVariable("cardId") int cardId, @RequestParam int nouvelLimit) {
        return cardsService.updateCardLimit(cardId, nouvelLimit);
    }

    @Operation(summary = "Get all cards by type")
    @GetMapping("/cardsByType/{cardType}")
    public Object getAllCardsByType(@PathVariable("cardType") String cardType) {
        return cardsService.getAllCardsByType(cardType);
    }
}
