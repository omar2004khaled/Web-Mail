package com.MailServer.MailServer.service.FilterEmail;

import com.MailServer.MailServer.service.Email.Email;

import java.util.ArrayList;
import java.util.List;

public class AndCriteria implements Criteria {
    private final Criteria criteria1;
    private final Criteria criteria2;
    private final Criteria criteria3;
    private final Criteria criteria4;
    private final Criteria criteria5;
    private final Criteria criteria6;

    public AndCriteria(FilterDTO dto) {
        this.criteria1 = new CriteriaSender(dto);
        this.criteria2 = new CriteriaSubject(dto);
        this.criteria3 = new CriteriaDate(dto);
        this.criteria4 = new CriteriaBody(dto);
        this.criteria5 = new Criteriapriority(dto);
        this.criteria6 = new CriteriaReciever(dto);
    }

    @Override
    public List<Email> meetCriteria(List<Email> emails) {
        List<Email> finalizer =new ArrayList<Email>(emails);
        if(this.criteria1.get() != null){
            finalizer =this.criteria1.meetCriteria(finalizer);
        }
        if(this.criteria2.get() != null){
            finalizer =this.criteria2.meetCriteria(finalizer);
        }
        if(this.criteria3.get() !=null){
            finalizer=this.criteria3.meetCriteria(finalizer);
        }
        if(this.criteria4.get() !=null){
            finalizer=this.criteria4.meetCriteria(finalizer);
        }
        if(this.criteria5.get() !=null){
            finalizer=this.criteria5.meetCriteria(finalizer);
        }
        if(this.criteria6.get() !=null){
            finalizer=this.criteria6.meetCriteria(finalizer);
        }
        return finalizer;
    }
    public String get(){
        return null;
    }
}
