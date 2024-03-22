package com.eazybytes.cards.service;

import com.eazybytes.cards.model.Cards;
import com.eazybytes.cards.repository.CardsRepository;
import com.eazybytes.cards.repository.CustomerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CardsService {

    @Autowired
    private CardsRepository cardsRepository;

    @Autowired
    private CustomerRepository customerRepository;

    private static final Logger logger = LoggerFactory.getLogger(CardsService.class);

    public List<Cards> getAllCards() {
        List<Cards> allCards = new ArrayList<>();
        cardsRepository.findAll().forEach(allCards::add);
        return allCards;
    }

    public Cards getCardById(int id) {
        return cardsRepository.findById(id).orElse(null);
    }

    public String saveCard(Cards card) {
        int customerId = card.getCustomerId();
        if (customerRepository.existsById(customerId)) {
            card.setCreateDt(LocalDate.now());
            cardsRepository.save(card);
            return "Card saved successfully";
        } else {
            return "Failed to save card, customer not found!";
        }
    }

    public String updateCard(int id, Cards updateCard) {
        Optional<Cards> cardFind = cardsRepository.findById(id);
        if (cardFind.isPresent()) {
            updateCard.setCardId(id);
            updateCard.setCreateDt(LocalDate.now());
            cardsRepository.save(updateCard);
            return "Card updated successfully!";
        } else {
            return "Card not found!";
        }
    }

    public String deleteCardById(int id) {
        if (cardsRepository.existsById(id)) {
            cardsRepository.deleteById(id);
            return "Card deleted successfully!";
        } else {
            return "Card not found!";
        }
    }

    @Transactional
    public List<String> saveAll(List<Cards> cardsList) {
        List<String> responses = new ArrayList<>();
        for (Cards card : cardsList) {
            responses.add(saveCard(card));
        }
        return responses;
    }

    @Transactional
    public String deleteAllCards() {
        cardsRepository.deleteAll();
        return "All cards have been deleted successfully";
    }

    public String deleteCardByCardNb(int cardNumber) {
        if (cardsRepository.existsByCardNumber(cardNumber)) {
            cardsRepository.deleteByCardNumber(cardNumber);
            return "Card deleted successfully";
        } else {
            return "Card not found!";
        }
    }

    public String deleteCardsByCustomerId(int customerId) {
        if (customerRepository.existsById(customerId)) {
            List<Cards> cards = cardsRepository.findByCustomerId(customerId);
            cardsRepository.deleteAll(cards);
            return "Cards deleted successfully";
        } else {
            return "Customer not found!";
        }
    }

    public String deleteMultipleCardsByIds(List<Integer> cardIds) {
        cardsRepository.deleteAllById(cardIds);
        return "Cards deleted successfully";
    }

    public String updateCardLimit(int cardId, int newLimit) {
        Optional<Cards> card = cardsRepository.findById(cardId);
        if (card.isPresent()) {
            Cards updatedCard = card.get();
            updatedCard.setTotalLimit(newLimit);
            updatedCard.setAvailableAmount(newLimit - updatedCard.getAmountUsed());
            cardsRepository.save(updatedCard);
            return "Card limit updated successfully";
        } else {
            return "Card not found!";
        }
    }

    public Object getAllCardsByType(String cardType) {
        //return cardsRepository.findByCardType(cardType);
        List<Cards> allCardsByType = new ArrayList<Cards>();

        cardsRepository.findAll().forEach(cards -> {
            if(cards.getCardType().equalsIgnoreCase(cardType)) {
                allCardsByType.add(cards);
            }
        });
        if(allCardsByType.size() == 0) {
            return "Carte non trouvée (404)";
        } else {
            return allCardsByType ;
        }
    }
}
