package com.scopic.task.bid.service;

import com.scopic.task.bid.model.Bid;
import com.scopic.task.bid.model.Item;
import com.scopic.task.bid.repository.BidRepository;
import com.scopic.task.bid.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class BidService {

    private final BidRepository bidRepository;
    private final ItemRepository itemRepository;

    public BidService(BidRepository bidRepository, ItemRepository itemRepository) {
        this.bidRepository = bidRepository;
        this.itemRepository = itemRepository;
    }

    public Item findItemById(Long id){
        return itemRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Bid not found"));
    }

    public Optional<List<Bid>> getBids(Long id) {
        Item item = findItemById(id);

        return Optional.of(bidRepository.findAllByItem(item));
    }

    public Bid createBid(Bid bid, Long id) {
        Item item = findItemById(id);

        Bid newBid = new Bid(bid.getId(), bid.getPrice(), bid.getBidder(), item);
        return bidRepository.save(newBid);
    }

    public Bid deleteBid(Long id) {
        Bid bid = bidRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Bid not found"));

        bidRepository.delete(bid);
        return bid;
    }
}
