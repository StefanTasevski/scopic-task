package com.scopic.task.bid.repository;

import com.scopic.task.bid.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {

}