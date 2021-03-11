package com.michal.sample.repository;

import com.michal.sample.model.RequestTypeModel;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

@Repository
public class RequestTypeRepository implements IRequestTypeRepository{

    private final MongoClient mongoClient;
    private MongoCollection<RequestTypeModel> requestTypeCollection;

    @Value("${dbname}")
    private String dbname;

    public RequestTypeRepository(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    @PostConstruct
    void init() {
        requestTypeCollection = mongoClient.getDatabase(dbname).getCollection("RequestTypes", RequestTypeModel.class);
    }

    @Override
    public RequestTypeModel save(RequestTypeModel requestTypeModel) {
        requestTypeCollection.insertOne(requestTypeModel);
        return requestTypeModel;
    }

    @Override
    public List<RequestTypeModel> findAll() {
        return requestTypeCollection.find().into(new ArrayList<>());
    }

    @Override
    public List<String> getAllRequestTypes() {
        List<String> all = new ArrayList<>();

        for(RequestTypeModel requestTypeModel : findAll()){
            all.add(requestTypeModel.getRequestType());
        }
        return all;
    }

    @Override
    public RequestTypeModel findOne(String id) {
        return requestTypeCollection.find(eq("_id",  new ObjectId(id))).first();
    }

    @Override
    public String delete(String id) {
        return "Deleted items: " + requestTypeCollection.deleteOne(eq("_id", new ObjectId(id)));
    }
}
