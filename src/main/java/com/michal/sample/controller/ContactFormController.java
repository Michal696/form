package com.michal.sample.controller;

import com.michal.sample.model.ContactFormModel;
import com.michal.sample.repository.ContactFormRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/contact-forms")
public class ContactFormController {

    private final static Logger LOGGER = LoggerFactory.getLogger(ContactFormController.class);

    private final ContactFormRepository contactFormRepository;

    @CrossOrigin
    @PostMapping("contact-form")
    @ResponseStatus(HttpStatus.CREATED)
    public ContactFormModel createContactForm(@RequestBody ContactFormModel contactForm) {
        return contactFormRepository.save(contactForm);
    }

    @GetMapping
    public List<ContactFormModel> getContactForms() {
        return contactFormRepository.findAll();
    }

    @GetMapping("contact-form/{id}")
    public ResponseEntity<ContactFormModel> getContactForm(@PathVariable String id) {
        ContactFormModel contactForm = contactFormRepository.findOne(id);
        if (contactForm == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        return ResponseEntity.ok(contactForm);
    }

    @DeleteMapping("contact-form/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public String deleteContactForm(@PathVariable String id) {
        return contactFormRepository.delete(id);
    }


    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public final Exception handleAllExceptions(RuntimeException e) {
        LOGGER.error("Internal server error.", e);
        return e;
    }

    @ExceptionHandler(HttpClientErrorException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    public final void handleAllExceptions(HttpClientErrorException e) {
        LOGGER.error("EXPECTATION_FAILED error.");
    }
}
