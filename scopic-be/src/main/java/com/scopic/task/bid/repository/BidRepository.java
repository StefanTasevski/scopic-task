package com.scopic.task.bid.repository;

import com.scopic.task.bid.model.Bid;
import com.scopic.task.bid.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Long> {

    List<Bid> findAllByItem(Item item);

    Optional<Bid> findFirstByItemOrderByPriceDesc(Item item);
}
