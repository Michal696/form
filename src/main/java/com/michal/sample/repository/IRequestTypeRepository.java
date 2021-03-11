package com.michal.sample.repository;

import com.michal.sample.model.RequestTypeModel;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IRequestTypeRepository {

    RequestTypeModel save(RequestTypeModel example);

    List<RequestTypeModel> findAll();

    List<String> getAllRequestTypes();

    RequestTypeModel findOne(String id);

    String delete(String id);
}