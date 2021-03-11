package com.michal.sample.repository;

import java.util.List;

import com.michal.sample.model.ContactFormModel;
import org.springframework.stereotype.Repository;

@Repository
public interface IContactFormRepository {

    ContactFormModel save(ContactFormModel example);

    List<ContactFormModel> findAll();

    ContactFormModel findOne(String id);

    String delete(String id);
}