package com.scopic.task.bid.controller;

import com.scopic.task.bid.model.Bid;
import com.scopic.task.bid.service.BidService;
import org.hibernate.PropertyNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/bids")
@RestController
public class BidController {
    private final BidService bidService;
    private final static Logger logger = LoggerFactory.getLogger(BidController.class);

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @PreAuthorize("hasAnyRole('USER, ADMIN')")
    @GetMapping("/get/{id}")
    public ResponseEntity<List<Bid>> getBids(@PathVariable Long id) {
        logger.info("Fetching bids for item with id [{}]", id);
        return bidService.getBids(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new PropertyNotFoundException("No registered bids."));
    }

    @PreAuthorize("hasAnyRole('USER, ADMIN')")
    @PostMapping("/create/{id}")
    public ResponseEntity<Bid> createBid(@RequestBody Bid bid, @PathVariable Long id) {
        logger.info("Creating bid for item with id [{}]", id);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bidService.createBid(bid, id));
    }

    @PreAuthorize("hasAnyRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Bid> deleteImageElement(@PathVariable Long id)
    {
        logger.info("Deleting bid with id [{}]", id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(bidService.deleteBid(id));
    }
}
