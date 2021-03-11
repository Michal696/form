package com.michal.sample.controller;

import com.michal.sample.model.RequestTypeModel;
import com.michal.sample.repository.RequestTypeRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/request-types")
public class RequestTypeController {

    private final static Logger LOGGER = LoggerFactory.getLogger(RequestTypeController.class);

    private final RequestTypeRepository requestTypeRepository;

    @PostMapping("request-type")
    @ResponseStatus(HttpStatus.CREATED)
    public RequestTypeModel createRequestType(@RequestBody RequestTypeModel requestTypeModel) {
        return requestTypeRepository.save(requestTypeModel);
    }

    @GetMapping
    @CrossOrigin
    public List<String> getRequestTypes() {
        return requestTypeRepository.getAllRequestTypes();
    }

    @GetMapping("details")
    public List<RequestTypeModel> getRequestTypesDetails() {
        return requestTypeRepository.findAll();
    }

    @GetMapping("request-type/{id}")
    public ResponseEntity<RequestTypeModel> getRequestType(@PathVariable String id) {
        RequestTypeModel requestType = requestTypeRepository.findOne(id);
        if (requestType == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(requestType);
    }

    @DeleteMapping("request-type/{id}")
    public String deleteRequestType(@PathVariable String id) {
        return requestTypeRepository.delete(id);
    }


    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }
}
