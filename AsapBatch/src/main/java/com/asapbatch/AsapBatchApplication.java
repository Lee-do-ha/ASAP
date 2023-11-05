package com.asapbatch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class AsapBatchApplication {

	public static void main(String[] args) {
		SpringApplication.run(AsapBatchApplication.class, args);
	}

}
