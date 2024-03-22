package com.eazybytes.cards.repository;

import com.eazybytes.cards.model.Cards;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardsRepository extends CrudRepository<Cards, Integer> {

    List<Cards> findByCustomerId(int customerId);

    List<Cards> findByCardType(String cardType);

    void deleteByCardNumber(int cardNumber);

    boolean existsByCardNumber(int cardNumber);

    boolean existsByCustomerId(int customerId);

    boolean existsByCardType(String cardType);
}
