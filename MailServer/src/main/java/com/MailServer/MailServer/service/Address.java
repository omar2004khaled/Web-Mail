package com.MailServer.MailServer.service;

import com.MailServer.MailServer.service.User.User;
import jakarta.persistence.*;
import lombok.Data;

import static jakarta.persistence.GenerationType.SEQUENCE;

@Data
@Entity
public class Address {
    @Id
    @SequenceGenerator(
            name = "address_sequence",
            sequenceName = "address_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "address_sequence"
    )
    private Long emailAddressID;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userid", referencedColumnName = "userid")
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "contactid", referencedColumnName = "contactid")
    private Contact contact;

    private String email;

    public Address() {
    }

    public Address(String email) {
        this.email = email;
    }
}
