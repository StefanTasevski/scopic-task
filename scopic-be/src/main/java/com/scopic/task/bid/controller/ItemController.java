package com.scopic.task.bid.controller;

import com.scopic.task.bid.model.Item;
import com.scopic.task.bid.model.ItemVM;
import com.scopic.task.bid.service.ItemService;
import org.hibernate.PropertyNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/items")
@RestController
public class ItemController {
    private final ItemService itemService;
    private final static Logger logger = LoggerFactory.getLogger(BidController.class);

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PreAuthorize("hasAnyRole('USER, ADMIN')")
    @GetMapping("/get")
    public ResponseEntity<List<ItemVM>> getItems() {
        logger.info("Fetching items...");
        return itemService.getItems()
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new PropertyNotFoundException("No registered items."));
    }

    @PreAuthorize("hasAnyRole('USER, ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<ItemVM> getItem(@PathVariable Long id) {
        logger.info("Fetching item with id [{}]", id);
        return itemService.getItem(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new PropertyNotFoundException("No registered items."));
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        logger.info("Creating item...");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(itemService.createItem(item));
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Item> deleteItem(@PathVariable Long id)
    {
        logger.info("Deleting item with id [{}]", id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(itemService.deleteItem(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<Item> updateBid(@RequestBody Item item, @PathVariable Long id) {
        logger.info("Updating item with id [{}]", id);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(itemService.updateItem(item, id));
    }


}
