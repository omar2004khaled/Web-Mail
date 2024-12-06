package com.Webmail.Webmail.service;

import com.Webmail.Webmail.service.Email.Email;
import lombok.Data;

import java.util.List;

@Data
public class Folder {
    private List<Email> emails;
    private String name;

    public Folder(){}

    public Folder(List<Email>emails,String name){
        this.emails=emails;
        this.name=name;
    }
}
