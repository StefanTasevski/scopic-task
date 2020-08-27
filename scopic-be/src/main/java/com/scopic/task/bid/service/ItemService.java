package com.scopic.task.bid.service;

import com.scopic.task.bid.model.Bid;
import com.scopic.task.bid.model.Item;
import com.scopic.task.bid.model.ItemVM;
import com.scopic.task.bid.repository.BidRepository;
import com.scopic.task.bid.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ItemService {
    private final BidRepository bidRepository;
    private final ItemRepository itemRepository;

    public ItemService(BidRepository bidRepository, ItemRepository itemRepository) {
        this.bidRepository = bidRepository;
        this.itemRepository = itemRepository;
    }

    public Optional<List<ItemVM>> getItems() {

        return Optional.of(itemRepository.findAll().stream()
                .map(item -> {
                    Double price = getMaxPrice(item.getId())
                            .orElseThrow(() -> new NoSuchElementException("Item not found"));
                    return new ItemVM(item, price);
                })
                .collect(Collectors.toList()));
    }

    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    public Item deleteItem(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Item not found"));

        itemRepository.delete(item);
        return item;
    }

    public Item updateItem(Item item, Long id) {
        Item oldItem = itemRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Item not found"));

        if(item.getDescription()!= null)
            oldItem.setDescription(item.getDescription());
        if(item.getStart()!= null)
            oldItem.setStart(item.getStart());
        if(item.getFinish()!= null)
            oldItem.setFinish(item.getFinish());
        if(item.getName()!= null)
            oldItem.setName(item.getName());
        return itemRepository.save(oldItem);
    }

    public Optional<Double> getMaxPrice(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Item not found"));

        if(bidRepository.findFirstByItemOrderByPriceDesc(item).isPresent()) {
            Bid bid = bidRepository.findFirstByItemOrderByPriceDesc(item)
                    .orElseThrow(() -> new NoSuchElementException("Item not found"));
            return Optional.of(bid.getPrice());
        }
        return Optional.of(0.0);
    }

    public Optional<ItemVM> getItem(Long id) {
        if(itemRepository.findById(id).isPresent()) {
            Item item = itemRepository.findById(id).get();
            Double price = getMaxPrice(item.getId())
                    .orElseThrow(() -> new NoSuchElementException("Item not found"));
            return Optional.of(new ItemVM(itemRepository.findById(id).get(), price));
        }
        else {
            throw new NoSuchElementException("Item not found");
        }
    }
}
