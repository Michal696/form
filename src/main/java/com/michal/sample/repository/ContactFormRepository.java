package com.michal.sample.repository;

import com.michal.sample.model.ContactFormModel;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.HttpClientErrorException;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

@Repository
public class ContactFormRepository implements IContactFormRepository {

    private final MongoClient mongoClient;
    private MongoCollection<ContactFormModel> contactFormCollection;


    @Value("${dbname}")
    private String dbname;

    public ContactFormRepository(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    @PostConstruct
    void init() {
        contactFormCollection = mongoClient.getDatabase(dbname).getCollection("ContactForms", ContactFormModel.class);
    }

    @Override
    public ContactFormModel save(ContactFormModel contactFormModel) {

        if(contactFormModelValidated(contactFormModel)){
            contactFormCollection.insertOne(contactFormModel);
            return contactFormModel;
        }
        throw new HttpClientErrorException(HttpStatus.EXPECTATION_FAILED);

    }

    private boolean contactFormModelValidated(ContactFormModel contactFormModel){
        // TODO add requestType validation

        boolean policyNumberValidated = contactFormModel.getPolicyNumber().matches("[A-Za-z0-9]+");
        boolean nameValidated = contactFormModel.getName().matches("[A-Za-z]+");
        boolean surnameValidated = contactFormModel.getSurname().matches("[A-Za-z]+");
        int MAX_SIZE_OF_REQUEST_TEXT = 500;
        boolean requestTextValidated = (contactFormModel.getRequestText().length() < MAX_SIZE_OF_REQUEST_TEXT);

        return policyNumberValidated
                && nameValidated
                && surnameValidated
                && requestTextValidated;
    }

    @Override
    public List<ContactFormModel> findAll() {
        return contactFormCollection.find().into(new ArrayList<>());
    }

    @Override
    public ContactFormModel findOne(String id) {
        return contactFormCollection.find(eq("_id",  new ObjectId(id))).first();
    }

    @Override
    public String delete(String id) {
        return "Deleted items: " + contactFormCollection.deleteOne(eq("_id", new ObjectId(id))).getDeletedCount();
    }

}
