package com.scopic.task.bid.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ItemVM {
    private Long id;
    private String name;
    private String description;
    private LocalDateTime start;
    private LocalDateTime finish;
    private Double maxBid;

    public ItemVM(Item item, Double maxBid) {
        this.id = item.getId();
        this.name = item.getName();
        this.description = item.getDescription();
        this.start = item.getStart();
        this.finish = item.getFinish();
        this.maxBid = maxBid;
    }
}
