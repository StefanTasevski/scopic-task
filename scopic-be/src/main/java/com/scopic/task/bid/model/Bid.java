package com.scopic.task.bid.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "bid")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Bid {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "price")
    private Double price;
    @Column(name = "bidder")
    private String bidder;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="item")
    private Item item;
}
